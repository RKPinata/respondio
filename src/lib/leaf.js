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

const createNewNodesFromLeafNodes
