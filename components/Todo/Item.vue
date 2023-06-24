<script lang="ts" setup>
const props = defineProps<{
  id?: number
  name: string
  photo?: string | null
  description?: string
}>()
const emit = defineEmits<{ checked: [boolean] }>()
const disabled = computed(() => checked.value || !props.id)
const checked = ref(false)

function checkOff(event: InputEvent & { target: HTMLInputElement }) {
  checked.value = event.target.checked
  emit('checked', checked.value)
}
</script>

<template>
  <li class="flex items-center">
    <label class="flex py-1 pr-2">
      <span class="sr-only">Delete</span>
      <input :disabled="disabled" class="checkbox border-black/40" type="checkbox"
        @input.prevent="checkOff($event as any)" />
    </label>
    <NuxtLink :to="id ? `/${id}` : ''" :class="{ 'opacity-50 cursor-not-allowed': disabled }"
      class="w-full px-4 py-2 transition-colors hover:bg-neutral-content/30 rounded-lg flex justify-between">
      <p :class="{ 'line-through': checked }" class="overflow-hidden text-ellipsis whitespace-nowrap">{{ name }}</p>
      <div class="mask mask-squircle">
        <img v-if="photo" :src="`/uploads/${photo}`" class="w-6 h-6 object-cover">
      </div>
    </NuxtLink>
  </li>
</template>
