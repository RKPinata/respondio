<script setup>
import { Typography } from '@/components/typography'
import { useDrawer } from '@/composables'
import { computed, watch } from 'vue'
import NodeIcon from '../flowchart-node/NodeIcon.vue'
import { Separator } from '@/components/ui/separator'
import FlowchartDrawerContent from './FlowchartDrawerContent.vue'
import { useFlowStore } from '@/stores'

const { closeDrawer, isOpen, nodeId } = useDrawer()
const flowstore = useFlowStore()

const selectedNode = computed(() => {
  return flowstore.selectedNode
})

const title = computed(() => {
  if (!selectedNode.value) return ''
  if (selectedNode.value.id === '1') return 'Trigger'

  return selectedNode.value.name
})

const nodeType = computed(() => {
  if (!selectedNode.value) return ''
  return selectedNode.value.type
})

watch(
  nodeId,
  (id) => {
    if (!id) return
    flowstore.setSelectedNode(id)
  },
  { immediate: true },
)
</script>
<template v-if="true">
  <div
    :class="{
      'flex flex-col bg-background overflow-hidden transition-all duration-300 ease-in-out border-l': true,
      'w-0 p-0': !isOpen,
      'w-[500px] p-4': isOpen,
    }"
  >
    <div class="text-right">
      <unicon name="multiply" fill="#020617" @click="closeDrawer" class="cursor-pointer" />
    </div>
    <div class="flex-grow flex flex-col gap-4">
      <div class="flex gap-2 items-center">
        <NodeIcon :type="nodeType" />
        <Typography variant="h2">{{ title }}</Typography>
      </div>
      <Separator />
      <FlowchartDrawerContent :nodeDetails="selectedNode" :nodeType="nodeType" />
    </div>
  </div>
</template>
