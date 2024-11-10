<script setup>
import { defineProps } from 'vue'

defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  toggleOpen: {
    type: Function,
    required: true,
  },
})
</script>
<template>
  <div
    :class="{
      'overflow-hidden transition-all duration-300 ease-in-out': true,
      'w-0': !isOpen,
      'w-[500px]': isOpen,
    }"
  >
    <p>Drawer</p>
    <button @click="toggleOpen">Close</button>
  </div>
</template>
