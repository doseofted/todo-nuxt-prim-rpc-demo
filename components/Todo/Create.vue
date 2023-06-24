<script lang="ts" setup>
withDefaults(defineProps<{
  title?: string
  actionName?: string
  defaults?: null | { name?: string, description?: string, id?: number, photo?: string | null }
}>(), {
  title: 'New Task',
  actionName: 'Create',
  defaults: null
})
const emit = defineEmits<{
  submit: [event: SubmitEvent & { target: HTMLFormElement }]
}>()

</script>

<template>
  <form class="space-y-8" @submit.prevent="emit('submit', $event as any)">
    <h2 class="card-title">{{ title }}</h2>
    <div class="grid grid-cols-2 gap-8">
      <input :value="defaults?.id" name="id" type="hidden" />
      <label class="space-y-2 col-span-2">
        <span>Name <span class="text-red-400">∗</span></span>
        <input :value="defaults?.name" name="name" required min="1" type="text" class="input input-bordered w-full" />
      </label>
      <label class="space-y-2 col-span-2">
        <span>Description</span>
        <textarea :value="defaults?.description" name="description" type="text"
          class="textarea textarea-bordered w-full" />
      </label>
      <label class="space-y-2 col-span-2">
        <span>Attachment</span>
        <input type="file" name="file" accept="image/*" class="file-input file-input-bordered w-full" />
      </label>
    </div>
    <div class="card-actions justify-end">
      <button type="submit" class="btn btn-primary">
        <Icon name="ri:task-line" size="1.5rem" />
        <span>{{ actionName }}</span>
      </button>
    </div>
  </form>
</template>
