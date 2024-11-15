import { ref } from 'vue'
import { defineStore } from 'pinia'
import { mockEdges, mockNode } from '@/mock/mockNodeAndEdges'
import {
  convertAddNodeToNewNode,
  generateAddNewNode,
  generateNewEdge,
  getNewAddNodesFromConnectors,
  getNewDateTimeConnectorsFromNode,
  initializeNodesAndEdges,
} from '@/lib/nodeHelpers'

export const useFlowStore = defineStore('flow', () => {
  // State variables
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

  const addNode = (node) => {
    nodes.value.push(node)
  }

  const addEdge = (edge) => {
    edges.value.push(edge)
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

  const handleCreateNewNode = ({ type, name }) => {
    const newNode = convertAddNodeToNewNode(selectedNode.value, {
      newType: type,
      newName: name,
    })

    const updatedNodes = getNodesWithUpdatedProperties(newNode.id, newNode)
    const updatedEdges = [...edges.value]

    switch (type) {
      case 'dateTime': {
        const { connectors, connectorEdges } = getNewDateTimeConnectorsFromNode(newNode)
        const { addNewNodes, addNewEdges } = getNewAddNodesFromConnectors(connectors)

        updatedNodes.push(...connectors, ...addNewNodes)
        updatedEdges.push(...connectorEdges, ...addNewEdges)
        break
      }
      default: {
        const newAddNode = generateAddNewNode(newNode.id, {
          x: newNode.position.x,
          y: newNode.position.y + 200,
        })
        const newEdgeForAddNode = generateNewEdge(newNode.id, newAddNode.id)

        updatedNodes.push(newAddNode)
        updatedEdges.push(newEdgeForAddNode)
        break
      }
    }

    recomputeNodes(updatedNodes)
    recomputeEdges(updatedEdges)
    selectedNode.value = newNode
  }

  // Helper functions
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

  return {
    nodes,
    edges,
    selectedNode,
    setSelectedNode,
    getNodeById,
    getEdgeById,
    addNode,
    addEdge,
    updateNodeData,
    updateNodePosition,
    handleCreateNewNode,
  }
})
