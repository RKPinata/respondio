<script setup>
import Typography from '@/components/typography/Typography.vue'
import { defineProps, computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  data: {
    type: null,
    required: true,
  },
  isValid: {
    type: Boolean,
    default: true,
  },
})

const getDateTimeDescription = (data) => {
  return `Business Hours - ${data.timezone}`
}

const getMessageDescription = (data) => {
  const payload = Array.isArray(data.payload) ? data.payload : [data.payload]
  return payload
    .map((item) => {
      if (item.type === 'text') return item.text
      if (item.type === 'attachment') return item.attachment
      return ''
    })
    .join(' ')
}

const getCommentDescription = (data) => {
  return data.comment
}

const getDescription = (type, data, isValid) => {
  if (!isValid) {
    return {
      sendMessage: 'No message provided',
      addComment: 'No comment provided',
    }[type]
  }

  switch (type) {
    case 'trigger':
      return 'Conversation Opened'

    case 'dateTime':
      return getDateTimeDescription(data)

    case 'sendMessage':
      return getMessageDescription(data)

    case 'addComment':
      return getCommentDescription(data)
  }
}

const description = computed(() => getDescription(props.type, props.data, props.isValid))
</script>
<template>
  <div class="px-2">
    <Typography variant="p" v-if="type === 'sendMessage' && isValid">Message:</Typography>
    <Typography
      variant="p"
      :class="{
        'line-clamp-3': true,
        italic: type === 'sendMessage' && isValid,
        'text-muted-foreground': !isValid,
      }"
    >
      {{ description }}
    </Typography>
  </div>
</template>
