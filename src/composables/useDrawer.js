import { computed } from 'vue'
import { useFlowStore } from '../stores/flowStore'
import { useRouter, useRoute } from 'vue-router'

export function useDrawer() {
  const router = useRouter()
  const route = useRoute()

  const { getNodeById } = useFlowStore()

  const nodeId = computed(() => route.query.nodeId)

  const nodeDetails = computed(() => {
    const node = getNodeById(nodeId.value)
    return node
  })

  const isOpen = computed(() => !!nodeId.value)

  const openDrawer = (id) => {
    router.push({ query: { nodeId: id } })
  }

  const closeDrawer = () => {
    router.push({ query: {} })
  }

  return {
    nodeDetails,
    isOpen,
    openDrawer,
    closeDrawer,
  }
}
