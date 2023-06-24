<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const [paginationElement] = useAutoAnimate()
const [nextPrevElement] = useAutoAnimate()

const props = withDefaults(defineProps<{
  page: number
  count: number
}>(), {
  page: 1,
  count: 1,
})
const emit = defineEmits<{
  'update:page': [number]
}>()
const currentPage = useVModel(props, 'page', emit)
</script>

<template>
  <div class="join hidden lg:inline-flex" ref="paginationElement">
    <button v-for="p of count" class="join-item btn" :class="{ 'btn-active': page === p }" @click="currentPage = p">
      {{ p }}
    </button>
  </div>
  <div class="join lg:hidden" ref="nextPrevElement">
    <button v-if="page > 1" class="join-item btn" @click="currentPage--">
      <Icon name="ri:arrow-drop-left-line" size="1.5rem" />
      <span class="sr-only">Previous</span>
    </button>
    <button v-if="page < count" class="join-item btn" @click="currentPage++">
      <Icon name="ri:arrow-drop-right-line" size="1.5rem" />
      <span class="sr-only">Next</span>
    </button>
  </div>
</template>
