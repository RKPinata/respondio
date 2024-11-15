<script setup>
import { markRaw, computed } from 'vue'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/stores/'
import { useDrawer } from '@/composables'
import { Node, NodeTypeAddNew } from '@/components/flowchart'

const { openDrawer } = useDrawer()

const flowstore = useFlowStore()
const { onInit, fitView, snapToGrid } = useVueFlow()

const nodes = computed(() => flowstore.nodes)
const edges = computed(() => flowstore.edges)

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
  addNew: markRaw(NodeTypeAddNew),
}

const handleNodeClick = ({ event, node }) => {
  if (node.type === 'dateTimeConnector') return

  openDrawer(node.id)

  setTimeout(() => {
    fitView()
  }, 350)
}

const handleNodeDragStop = ({ node }) => {
  flowstore.updateNodePosition(node)
}
</script>
<template>
  <div class="flex-grow">
    <VueFlow
      :nodes="nodes"
      :edges="edges"
      :node-types="nodeTypes"
      @node-click="handleNodeClick"
      @node-drag-stop="handleNodeDragStop"
    >
      <Background />
      <Controls position="top-left"></Controls>
    </VueFlow>
  </div>
</template>
