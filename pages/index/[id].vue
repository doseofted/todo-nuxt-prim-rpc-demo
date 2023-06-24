<script lang="ts" setup>
const route = useRoute()
const router = useRouter()
const id = computed(() => Number(route.params.id))
const { data: page, refresh } = useAsyncData(async () => ({
  name: "N/A", description: "N/A", photo: ""
}), { watch: [id] })

const emit = defineEmits<{ checked: [boolean], updated: [] }>()

async function checkOff(event: Event & { target: HTMLInputElement }) {
  if (!event.target.checked) { return }
  console.warn("Not implemented")
  router.back()
  emit('checked', true)
}

const showEditModal = ref(false)

async function updateTask(event: SubmitEvent & { target: HTMLFormElement }) {
  console.warn("Not implemented")
  event.target.reset()
  showEditModal.value = false
  refresh()
  emit('updated')
}

async function removeAttachment() {
  console.warn("Not implemented")
  refresh()
  emit('updated')
}
</script>

<template>
  <div class="bg-white overflow-hidden grid lg:grid-cols-2">

    <!-- Attachment preview -->
    <div class="h-64 lg:h-full bg-primary/20 flex relative items-center justify-center lg:order-2">
      <img v-if="page?.photo" class="absolute w-full h-full inset-0 object-cover bg-primary/20"
        :src="`/uploads/${page.photo}`">
      <p v-else class="opacity-30"><em>(no attachment)</em></p>
    </div>

    <!-- Todo details -->
    <div class="card-body space-y-4 lg:order-1">
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
      <div class="btn-group max-w-full">
        <button class="btn" @click="showEditModal = true">
          <Icon name="ri:edit-2-fill" size="1.5rem" />
          <span>Edit</span>
        </button>
        <button class="btn tooltip" data-tip="Remove Attachment" @click="removeAttachment">
          <Icon name="ri:file-shred-fill" size="1.5rem" />
          <span class="sr-only">Remove Attachment</span>
        </button>
      </div>
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
