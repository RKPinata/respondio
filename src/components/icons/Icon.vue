<script setup>
defineProps({
  class: { type: String, default: '' },
  size: { type: [String, Number], default: '20' },
})
</script>

<template>
  <i class="inline-flex items-center justify-center w-5 h-5" role="img" aria-hidden="true">
    <slot></slot>
  </i>
</template>
