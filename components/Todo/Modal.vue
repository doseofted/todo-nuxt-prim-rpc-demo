<script setup lang="ts">
const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{
  'update:open': [value: boolean]
}>()
const open = useVModel(props, 'open', emit)

onMounted(() => {
  if (open.value) { modal.value?.showModal() }
})
const modal = ref<HTMLDialogElement>()
watch(open, (opened) => opened
  ? modal.value?.showModal()
  : modal.value?.close())
onKeyStroke("Escape", () => open.value = false)
</script>

<template>
  <dialog class="modal" ref="modal">
    <div class="modal-box p-0">
      <slot :open="open" />
    </div>
    <div class="modal-backdrop">
      <button @click="open = false">Close Modal</button>
    </div>
  </dialog>
</template>
