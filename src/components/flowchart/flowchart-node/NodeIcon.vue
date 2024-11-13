<script setup>
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
})

const iconConfig = computed(() => {
  if (!props.type) return null

  return {
    trigger: { name: 'bolt-alt', color: '#ec4899' },
    sendMessage: { name: 'message', color: '#10b981' },
    dateTime: { name: 'calendar-alt', color: '#f97316' },
    addComment: { name: 'comment-alt-lines', color: '#3b82f6' },
  }[props.type]
})
</script>

<template>
  <unicon v-if="iconConfig" :name="iconConfig.name" :fill="iconConfig.color" />
</template>
