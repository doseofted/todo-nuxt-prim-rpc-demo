<script setup lang="ts">
tryOnMounted(() => console.warn("Not implemented"))

const route = useRoute();
const router = useRouter()

const pageSize = 10
const page = ref(1)
const { data, refresh: refreshTodos } = useAsyncData(() => Promise.all([
  [{ name: "N/A", desription: "N/A", photo: "", id: -1 }], 0
]), { watch: [page] })
const todoList = computed(() => data.value?.[0] ?? [])
const count = computed(() => data.value?.[1] ?? 0)

const pageCount = computed(() => Math.ceil(count.value / pageSize))
watch(pageCount, newCount => {
  if (page.value > newCount) { page.value = newCount < 1 ? 1 : newCount }
})

const title = computed(() => `Tasks (${count.value})`.replace(/\(0\)$/, ''))
useHead({ title })

const showCreationModal = ref(false)
async function createNewTask(event: SubmitEvent & { target: HTMLFormElement }) {
  try {
    console.warn("Not implemented")
    event.target.reset()
    showCreationModal.value = false
    page.value = 1
    await refreshTodos()
  } catch (error) {
    console.warn(error)
  }
}

async function checkOffItem(id: number) {
  console.warn("Not implemented")
  setTimeout(refreshTodos, 150)
}

async function clearAll() {
  await Promise.all(todoList.value.map(todo => console.warn("Not implemented")))
  setTimeout(refreshTodos, 150)
}
</script>

<template>
  <div class="container max-w-screen-md mx-auto grid">
    <div ref="pageContainer" class="card card-body bg-base-100 flex flex-col overflow-hidden">

      <!-- Todo items -->
      <div class="flex justify-between items-end mb-2">
        <h1 class="flex-grow text-2xl font-bold">My Tasks</h1>
        <p v-if="pageCount > 0" class="text-right">Page {{ page }} of {{ pageCount }}</p>
      </div>
      <hr class="mb-2">
      <TodoList class="flex-grow">
        <TodoItem v-if="todoList.length > 0" v-for="todo of todoList" :key="todo.id" :id="todo.id" :name="todo.name"
          :photo="todo.photo" @checked="$event && checkOffItem(todo.id)" />
        <TodoItem v-else name="Nothing to see here, yet!" />
      </TodoList>

      <!-- Actions -->
      <div class="flex justify-between">
        <TodoPagination v-model:page="page" :count="pageCount" />
        <div class="btn-group justify-end">
          <button class="btn tooltip space-x-4" data-tip="Clear this page" @click="clearAll">
            <Icon name="ri:check-double-fill" size="1.5rem" />
            <span class="sr-only lg:not-sr-only">Clear</span>
          </button>
          <button class="btn" @click="showCreationModal = true">
            <Icon name="ri:add-fill" size="1.5rem" />
            <span class="sr-only lg:not-sr-only">New Task</span>
          </button>
        </div>
      </div>

    </div>

    <!-- Selected todo item -->
    <TodoModal class="modal-bottom max-w-screen-lg mx-auto" :open="route.path !== '/'"
      @update:open="!$event && router.back()">
      <NuxtPage @checked="refreshTodos" @updated="refreshTodos" />
    </TodoModal>

    <!-- Create new task -->
    <TodoModal v-model:open="showCreationModal">
      <TodoCreate @submit="createNewTask" class="p-8" />
    </TodoModal>
  </div>
</template>
