import { ref } from 'vue'
import { defineStore } from 'pinia'
import { mockEdges, mockNode } from '@/mock/mockNodeAndEdges'
import {
  convertAddNodeToNewNode,
  generateAddNewNode,
  generateNewEdge,
  initializeNodesAndEdges,
} from '@/lib/nodeHelpers'

export const useFlowStore = defineStore('flow', () => {
  const initialNodesAndEdges = initializeNodesAndEdges(mockNode, mockEdges)

  const nodes = ref(initialNodesAndEdges.nodes)
  const edges = ref(initialNodesAndEdges.edges)

  const selectedNode = ref(null)

  // Getters
  const getNodeById = (id) => nodes.value.find((node) => node.id === id)
  const getEdgeById = (id) => edges.value.find((edge) => edge.id === id)

  // Actions
  const setSelectedNode = (id) => {
    const node = getNodeById(id)
    selectedNode.value = node
  }

  const handleCreateNewNode = ({ type, name }) => {
    const newNode = (() => {
      switch (type) {
        case 'addComment': {
          return convertAddNodeToNewNode(selectedNode.value, {
            newType: 'addComment',
            newName: name,
          })
        }
        case 'sendMessage': {
          return convertAddNodeToNewNode(selectedNode.value, {
            newType: 'sendMessage',
            newName: name,
          })
        }
      }
    })()

    // switch (type) {
    //   case: 'date'
    // }

    const updatedNodes = getNodesWithUpdatedProperties(newNode.id, newNode)
    const newAddNode = generateAddNewNode(newNode.id, {
      x: newNode.position.x,
      y: newNode.position.y + 200,
    })

    const newEdgeForAddNode = generateNewEdge(newNode.id, newAddNode.id)

    console.log({ newEdgeForAddNode })

    updatedNodes.push(newAddNode)

    selectedNode.value = newNode
    recomputeNodes(updatedNodes)
    recomputeEdges([...edges.value, newEdgeForAddNode])
  }

  const addNode = (node) => {
    nodes.value.push(node)
  }

  const addEdge = (edge) => {
    edges.value.push(edge)
  }

  // Replace the entire nodes array with a new array to trigger reactivity
  const recomputeNodes = (newNodes) => {
    nodes.value = newNodes
  }

  const recomputeEdges = (newEdges) => {
    edges.value = newEdges
  }

  const getNodesWithUpdatedProperties = (id, updatedProperties) => {
    return nodes.value.map((node) =>
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

    const updatedNodes = getNodesWithUpdatedProperties(node.id, { data: newData })

    recomputeNodes(updatedNodes)
  }

  const updateNodePosition = (node) => {
    const newPosition = node.position

    const updatedNodes = getNodesWithUpdatedProperties(node.id, { position: newPosition })

    recomputeNodes(updatedNodes)
  }

  // Test Required
  // const removeNode = (id) => {
  //   nodes.value = nodes.value.filter((node) => node.id !== id)
  //   edges.value = edges.value.filter((edge) => edge.source !== id && edge.target !== id) // Remove related edges
  // }

  // Test Required
  // const updateEdge = (id, updatedData) => {
  //   const edgeIndex = edges.value.findIndex((edge) => edge.id === id)
  //   if (edgeIndex !== -1) {
  //     edges.value[edgeIndex] = { ...edges.value[edgeIndex], ...updatedData }
  //   }
  // }

  // const removeEdge = (id) => {
  //   edges.value = edges.value.filter((edge) => edge.id !== id)
  // }

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
    addEdge,

    handleCreateNewNode,
  }
})
