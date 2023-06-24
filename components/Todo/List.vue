<script lang="ts" setup>
import { useAutoAnimate } from '@formkit/auto-animate/vue'

const [listElement] = useAutoAnimate()
</script>

<template>
  <ul ref="listElement">
    <slot />
  </ul>
</template>
