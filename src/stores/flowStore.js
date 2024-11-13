import { ref } from 'vue'
import { defineStore } from 'pinia'
import { mockEdges, mockNode } from '@/mock/mockNodeAndEdges'

export const useFlowStore = defineStore('flow', () => {
  // Initial States
  const nodes = ref(mockNode)
  const edges = ref(mockEdges)

  const selectedNode = ref(null)

  // Getters
  const getNodeById = (id) => nodes.value.find((node) => node.id === id)
  const getEdgeById = (id) => edges.value.find((edge) => edge.id === id)

  // Actions
  const setSelectedNode = (id) => {
    const node = getNodeById(id)
    selectedNode.value = node
  }

  const addNode = (node) => {
    nodes.value.push(node)
  }

  const recomputeNodes = (id, updatedProperties) => {
    // Replace the entire nodes array with a new array where the node with the matching ID is updated

    nodes.value = nodes.value.map((node) =>
      node.id === id
        ? {
            ...node,
            ...updatedProperties,
          }
        : node,
    )
  }

  const updateNodeData = (node, payload) => {
    const newData = {
      ...node.data,
      ...payload,
    }

    recomputeNodes(node.id, { data: newData })
  }

  const updateNodePosition = (node) => {
    const newPosition = node.position

    recomputeNodes(node.id, { position: newPosition })
  }

  // Test Required
  const removeNode = (id) => {
    nodes.value = nodes.value.filter((node) => node.id !== id)
    edges.value = edges.value.filter((edge) => edge.source !== id && edge.target !== id) // Remove related edges
  }

  const addEdge = (edge) => {
    edges.value.push(edge)
  }

  // Test Required
  const updateEdge = (id, updatedData) => {
    const edgeIndex = edges.value.findIndex((edge) => edge.id === id)
    if (edgeIndex !== -1) {
      edges.value[edgeIndex] = { ...edges.value[edgeIndex], ...updatedData }
    }
  }

  const removeEdge = (id) => {
    edges.value = edges.value.filter((edge) => edge.id !== id)
  }

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    getNodeById,
    getEdgeById,
    addNode,
    updateNodeData,
    updateNodePosition,
    removeNode,
    addEdge,
    updateEdge,
    removeEdge,
  }
})
