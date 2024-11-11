<script setup>
import Separator from '@/components/ui/separator/Separator.vue'
import NodeIcon from './NodeIcon.vue'
import NodeDescription from './NodeDescription.vue'
import NodeTitle from './NodeTitle.vue'

const props = defineProps({
  nodeDetails: {
    type: null,
    required: true,
  },
})

const { type, name, data } = props.nodeDetails

const isValid =
  {
    trigger: true,
    dateTime: true,
    sendMessage: !!data.payload,
    addComment: !!data.comment,
  }[type] || false

const isConnector = type === 'dateTimeConnector'
</script>
<template>
  <span v-if="isConnector" class="text-blue-600 font-semibold bg-blue-200 px-2 py-1 rounded-lg">{{
    name
  }}</span>
  <div
    v-else
    :class="{
      'flex flex-col gap-2 py-2 w-64 bg-background rounded-lg border': true,
      'border-destructive': !isValid,
    }"
  >
    <div class="flex gap-2 items-center px-2">
      <NodeIcon :type="type" />
      <NodeTitle :type="type" :name="name" />
    </div>
    <Separator />
    <NodeDescription :type="type" :data="data" :isValid="isValid" />
  </div>
</template>
