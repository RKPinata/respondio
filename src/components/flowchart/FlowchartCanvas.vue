<script setup>
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
  <div class="bg-black flex-grow">
    <p>Canvas</p>
    <button @click="toggleOpen">Open</button>
  </div>
</template>
