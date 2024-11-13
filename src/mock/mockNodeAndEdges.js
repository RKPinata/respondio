import '@vue-flow/core'
import rawNode from './mockData.json'

// const generateEdgesFromRawData = (rawNodes) => {
//   rawNode
//     .filter((node) => node.parentId && node.parentId !== -1)
//     .map((node) => {
//       const sourceId = String(node.parentId)
//       const targetId = String(node.id)
//       return {
//         id: `e${sourceId}-${targetId}`,
//         source: sourceId,
//         target: targetId,
//       }
//     })
// }

const generateNodesFromRawData = (rawNodes) => {
  return rawNodes.map((node) => {
    const position = {
      1: {
        x: 0,
        y: 0,
      },
      d09c08: {
        x: 0,
        y: 150,
      },
      '161f52': {
        x: 200,
        y: 300,
      },
      '28c4b9': {
        x: 0,
        y: 300,
      },
      b0653a: {
        x: 200,
        y: 450,
      },
      b6a0c1: {
        x: -200,
        y: 450,
      },
      e870e4: {
        x: -200,
        y: 600,
      },
    }[node.id]

    return {
      ...node,
      id: String(node.id),
      position,
      data: {
        // add name & type to data
        ...node.data,
        type: node.type,
        name: node.name,
      },
    }
  })
}

const mockEdges = [
  { id: '1->d09c08', source: '1', target: 'd09c08', type: 'smoothstep' },
  { id: 'd09c08->161f52', source: 'd09c08', target: '161f52', type: 'smoothstep' },
  { id: 'd09c08->28c4b9', source: 'd09c08', target: '28c4b9', type: 'smoothstep' },
  { id: '161f52->b0653a', source: '161f52', target: 'b0653a', type: 'smoothstep' },
  { id: '28c4b9->b6a0c1', source: '28c4b9', target: 'b6a0c1', type: 'smoothstep' },
  { id: 'b6a0c1->e870e4', source: 'b6a0c1', target: 'e870e4', type: 'smoothstep' },
]

const mockNode = generateNodesFromRawData(rawNode)

export { mockNode, mockEdges }
