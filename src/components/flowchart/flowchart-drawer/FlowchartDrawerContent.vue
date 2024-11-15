<script setup>
import { Typography } from '@/components/typography'
import { FormAddComment, FormSendMessage, FormDateTime, FormAddNew } from '@/components/flowchart'

defineProps({
  nodeType: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <template v-if="nodeType === 'trigger'">
    <Typography variant="p">Conversation Opened</Typography>
  </template>

  <template v-if="nodeType === 'addComment'">
    <FormAddComment />
  </template>

  <template v-if="nodeType === 'sendMessage'">
    <FormSendMessage />
  </template>

  <template v-if="nodeType === 'dateTime'">
    <FormDateTime />
  </template>

  <template v-if="nodeType === 'addNew'">
    <FormAddNew />
  </template>
</template>
