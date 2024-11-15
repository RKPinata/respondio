<script setup>
import Typography from '@/components/typography/Typography.vue'

defineProps({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
})

const getTitle = (name, type) => {
  if (type === 'trigger') {
    return 'Trigger'
  } else {
    return name
  }
}
</script>
<template>
  <Typography variant="h4" class="text-lg font-medium line-clamp-1"
    >{{ getTitle(name, type) }}
  </Typography>
</template>
