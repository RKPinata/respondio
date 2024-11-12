<script setup>
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/stores/'
import Node from './flowchart-node/Node.vue'
import { markRaw } from 'vue'
import { useDrawer } from '@/composables'

const { openDrawer } = useDrawer()

const { nodes, edges } = useFlowStore()
const { onInit, fitView, snapToGrid } = useVueFlow()

snapToGrid.value = true

onInit(() => {
  fitView()
})

const nodeTypes = {
  trigger: markRaw(Node),
  dateTime: markRaw(Node),
  sendMessage: markRaw(Node),
  dateTimeConnector: markRaw(Node),
  addComment: markRaw(Node),
}

const handleNodeClick = ({ event, node }) => {
  if (node.type === 'dateTimeConnector') return

  openDrawer(node.id)
}
</script>
<template>
  <div class="flex-grow">
    <VueFlow :nodes="nodes" :edges="edges" :node-types="nodeTypes" @node-click="handleNodeClick">
      <Background />
      <Controls position="top-left"></Controls>
    </VueFlow>
  </div>
</template>
