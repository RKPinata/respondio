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

  const updateNodeData = (id, updatedData) => {
    const nodeIndex = nodes.value.findIndex((node) => node.id === id)
    if (nodeIndex !== -1) {
      nodes.value[nodeIndex] = {
        ...nodes.value[nodeIndex],
        data: {
          ...nodes.value[nodeIndex].data,
          ...updatedData,
        },
      }
    }
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

  console.log(nodes.value)

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    getNodeById,
    getEdgeById,
    addNode,
    updateNodeData,
    removeNode,
    addEdge,
    updateEdge,
    removeEdge,
  }
})
