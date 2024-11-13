<script setup>
import { Typography } from '@/components/typography'
import { useDrawer } from '@/composables'
import { computed, watchEffect } from 'vue'
import NodeIcon from '../flowchart-node/NodeIcon.vue'
import { Separator } from '@/components/ui/separator'
import FlowchartDrawerContent from './FlowchartDrawerContent.vue'

const { closeDrawer, isOpen, nodeDetails } = useDrawer()

const title = computed(() => {
  if (!nodeDetails.value) return ''
  if (nodeDetails.value.id === '1') return 'Trigger'

  return nodeDetails.value.name
})

const nodeType = computed(() => {
  if (!nodeDetails.value) return ''
  return nodeDetails.value.type
})

watchEffect(() => {
  console.log(nodeDetails.value)
})
</script>
<template>
  <div
    :class="{
      'bg-background overflow-hidden transition-all duration-300 ease-in-out': true,
      'w-0 p-0': !isOpen,
      'w-[500px] p-4 ': isOpen,
    }"
  >
    <div class="text-right">
      <unicon name="multiply" fill="#020617" @click="closeDrawer" class="cursor-pointer" />
    </div>
    <div class="flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <NodeIcon :type="nodeType" />
        <Typography variant="h2">{{ title }}</Typography>
      </div>
      <Separator />
      <FlowchartDrawerContent :nodeDetails="nodeDetails" :nodeType="nodeType" />
    </div>
  </div>
</template>
