<script setup>
import { Typography } from '@/components/typography'
import FormAddComment from './FormAddComment.vue'
import FormSendMessage from './FormSendMessage.vue'
import FormDateTime from './FormDateTime.vue'
import FormAddNew from './FormAddNew.vue'

const props = defineProps({
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
