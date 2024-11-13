<script setup>
import { Typography } from '@/components/typography'
import FormAddCard from './FormAddCard.vue'

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
    <FormAddCard />
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
