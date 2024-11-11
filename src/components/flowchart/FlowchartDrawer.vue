<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

const nodeId = route.query.nodeId

const isOpen = !!nodeId
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
  </div>
</template>
