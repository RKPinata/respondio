<script setup>
import { Typography } from '@/components/typography'

const props = defineProps({
  nodeDetails: {
    type: Object,
    required: true,
  },
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
    <div>input for comment</div>
  </template>

  <template v-if="nodeType === 'sendMessage'">
    <div>select input type</div>
    <div>message input or file upload</div>
  </template>

  <template v-if="nodeType === 'dateTime'">
    <div>
      <!-- input for date -->
      <!--  monday to friday input -->
      <!-- time select for from to to -->
    </div>
    <div>select timezone</div>
  </template>
</template>
