<script setup>
import { computed } from 'vue'

import Separator from '@/components/ui/separator/Separator.vue'
import NodeIcon from './NodeIcon.vue'
import NodeDescription from './NodeDescription.vue'
import NodeTitle from './NodeTitle.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const nodeType = props.data.type
const nodeData = computed(() => props.data || {})
const nodeName = computed(() => props.data.name || '')

const isValid = computed(() => {
  return {
    trigger: true,
    dateTime: true,
    sendMessage: !!nodeData.value.payload,
    addComment: !!nodeData.value.comment,
  }[nodeType]
})

const isConnector = nodeType === 'dateTimeConnector'
</script>
<template>
  <span v-if="isConnector" class="text-blue-600 font-semibold bg-blue-200 px-2 py-1 rounded-lg">{{
    nodeName
  }}</span>
  <div
    v-else
    :class="{
      'flex flex-col gap-2 py-2 w-64 bg-background rounded-lg border': true,
      'border-destructive': !isValid,
    }"
  >
    <div class="flex gap-2 items-center px-2">
      <NodeIcon :type="nodeType" />
      <NodeTitle :type="nodeType" :name="nodeName" />
    </div>
    <Separator />
    <NodeDescription :type="nodeType" :data="nodeData" :isValid="isValid" />
  </div>
</template>
