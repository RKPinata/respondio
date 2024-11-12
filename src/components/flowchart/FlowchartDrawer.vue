<script setup>
import { useDrawer } from '@/composables'
import { computed, watchEffect } from 'vue'

const { closeDrawer, isOpen, nodeDetails } = useDrawer()

watchEffect(() => {
  console.log({ isOpen, nodeDetails })
})
</script>
<template>
  <div
    :class="{
      'bg-background overflow-hidden transition-all duration-300 ease-in-out': true,
      'w-0': !isOpen,
      'w-[500px]': isOpen,
    }"
  >
    <p>Drawer</p>
    <button @click="closeDrawer">Close</button>
  </div>
</template>
