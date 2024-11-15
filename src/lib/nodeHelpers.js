import { generateNewId } from './utils'

const findLeafNodes = (nodes, edges) => {
  // Iterate over edges to find nodes with outgoing connections
  const nodesWithOutgoingEdges = new Set(edges.map((edge) => edge.source))

  // Leaf nodes are those that have no outgoing connections
  const leafNodes = Array.from(nodes).filter((node) => {
    const id = node.id
    return !nodesWithOutgoingEdges.has(id)
  })

  return leafNodes
}

const initializeAddNewNodes = (nodes, edges) => {
  const leafNodes = findLeafNodes(nodes, edges)
  const nodesToAdd = []
  const edgesToAdd = []

  leafNodes.forEach((leafAsParent) => {
    const newNode = generateAddNewNode(
      leafAsParent.id,
      {
        x: leafAsParent.position.x,
        y: leafAsParent.position.y + 200,
      },
      'addNew',
      'Add New',
    )

    nodesToAdd.push(newNode)

    const newEdge = generateNewEdge(leafAsParent.id, newNode.id)
    edgesToAdd.push(newEdge)
  })

  return { nodesToAdd, edgesToAdd }
}

export const initializeNodesAndEdges = (mockNode, mockEdges) => {
  const { nodesToAdd, edgesToAdd } = initializeAddNewNodes(mockNode, mockEdges)

  const nodes = [...mockNode, ...nodesToAdd]
  const edges = [...mockEdges, ...edgesToAdd]

  return { nodes, edges }
}

export const generateAddNewNode = (parentId, position) => ({
  type: 'addNew',
  name: 'Add New',
  parentId: parentId,
  id: generateNewId(),
  position: position,
  data: getDefaultNewNodeData('addNew', 'Add New'),
})

export const convertAddNodeToNewNode = (addNode, { newType, newName }) => {
  return {
    type: newType,
    name: newName,
    parentId: addNode.parentId,
    id: addNode.id,
    position: addNode.position,
    data: getDefaultNewNodeData(newType, newName),
  }
}

export const generateNewEdge = (source, target) => {
  return {
    id: `${source}-${target}`,
    source: source,
    target: target,
    type: 'smoothstep',
  }
}

// const generateDateTimeNodes = (parentId, addNodePosition, type, name) => {
//   // generate the dateTimenode with generateCommonNewNode

//   const connectorNodes = [
//     {
//       name: 'Success',
//       id: generateNewId(),
//       type: 'dateTimeConnector',
//       data: {
//         connectorType: 'success',
//       },
//       parentId: parentId,
//     },
//     {
//       name: 'Failure',
//       id: generateNewId(),
//       type: 'dateTimeConnector',
//       data: {
//         connectorType: 'failure',
//       },
//       parentId: parentId,
//     },
//   ]

//   return (newNodes = {})
// }

// const getDefaultPosition = (parentPosition, type) => {}

const getDefaultNewNodeData = (type, name) => {
  switch (type) {
    case 'addNew':
      return {
        type: 'addNew',
      }
    case 'sendMessage':
      return {
        type: 'sendMessage',
        name: name,
        payload: {
          type: 'text',
          text: '',
        },
      }
    case 'addComment':
      return {
        type: 'addComment',
        name: name,
        payload: {
          type: 'text',
          text: '',
        },
      }
    case 'dateTime':
      return {
        type: 'dateTime',
        name: name,
        times: [
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'mon',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'tue',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'wed',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'thu',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'fri',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'sat',
          },
          {
            startTime: '09:00',
            endTime: '17:00',
            day: 'sun',
          },
        ],
        timezone: 'UTC',
      }
  }
}

export const replaceNodeById = ({ nodes, newNode }) => {
  const index = nodes.findIndex((node) => node.id === newNode.id)

  if (index !== -1) {
    nodes[index] = newNode // Merge new data with existing node data if needed
  } else {
    console.error('Node not found')
  }

  return nodes
}
