<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const id = computed(() => Number(route.params.id))
const { data: page, refresh } = useAsyncData(() => backend.todo.find(id.value), { watch: [id] })

const emit = defineEmits<{ checked: [boolean], updated: [] }>()

async function checkOff(event: Event & { target: HTMLInputElement }) {
  if (!event.target.checked) { return }
  await backend.todo.check(id.value)
  router.back()
  emit('checked', true)
}

const showEditModal = ref(false)

async function updateTask(event: SubmitEvent & { target: HTMLFormElement }) {
  try {
    await backend.todo.update(event.target)
    event.target.reset()
    showEditModal.value = false
    emit('updated')
    refresh()
  } catch (error) {
    console.warn(error)
  }
}
</script>

<template>
  <div class="bg-white card overflow-hidden lg:card-side lg:flex-row-reverse">

    <!-- Attachment preview -->
    <img v-if="page?.photo" class="lg:w-1/2 h-[50vh] object-contain bg-primary/20 p-2" :src="`/uploads/${page.photo}`">
    <div v-else class="lg:w-1/2 h-[30svh] bg-primary/20 flex items-center justify-center">
      <p class="opacity-30"><em>(no attachment)</em></p>
    </div>

    <!-- Todo details -->
    <div class="card-body space-y-4 lg:w-1/2">
      <div class="flex gap-2 items-center">
        <label class="flex py-1 pr-2">
          <span class="sr-only">Delete</span>
          <input class="checkbox border-black/40" type="checkbox" @input.prevent="checkOff($event as any)" />
        </label>
        <h2 class="text-xl font-bold">
          {{ page?.name ?? "Task not found" }}
        </h2>
      </div>
      <p>
        <template v-if="page?.description">{{ page.description }}</template>
        <span v-else class="opacity-30"><em>(no description provided)</em></span>
      </p>
      <button class="btn btn-block" @click="showEditModal = true">
        <Icon name="ri:edit-2-fill" size="1.5rem" />
        <span>Edit</span>
      </button>
    </div>

    <!-- Update existing task -->
    <ClientOnly>
      <Teleport to="body">
        <TodoModal class="modal" v-model:open="showEditModal">
          <TodoCreate title="Edit Task" action-name="Edit" class="p-8" :defaults="page" @submit="updateTask" />
        </TodoModal>
      </Teleport>
    </ClientOnly>

  </div>
</template>
