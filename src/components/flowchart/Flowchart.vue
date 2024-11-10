<script setup>
import FlowchartCanvas from './FlowchartCanvas.vue'
import FlowchartDrawer from './FlowchartDrawer.vue'

import { ref, watch } from 'vue'

const isOpen = ref(true)

watch(isOpen, (value) => {
  console.log('isOpen', value)
})

const toggleOpen = () => {
  isOpen.value = !isOpen.value
}
</script>
<template>
  <main class="flex-grow flex">
    <FlowchartCanvas :isOpen="isOpen" :toggleOpen="toggleOpen" />
    <FlowchartDrawer :isOpen="isOpen" :toggleOpen="toggleOpen" />
  </main>
</template>
