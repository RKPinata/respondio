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
    const newNode = generateCommonNewNode(
      leafAsParent.id,
      {
        x: leafAsParent.position.x + 80,
        y: leafAsParent.position.y + 200,
      },
      'addNew',
      'Add New',
    )

    nodesToAdd.push(newNode)

    const newEdge = constructNewEdge(leafAsParent.id, newNode.id)
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

const generateCommonNewNode = (parentId, position, type, name) => ({
  type: type,
  name: name,
  parentId: parentId,
  id: generateNewId(),
  position: position,
  data: getDefaultNewNodeData(type, name),
})

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

const constructNewEdge = (source, target) => {
  return {
    id: `${source}-${target}`,
    source: source,
    target: target,
    type: 'smoothstep',
  }
}

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
