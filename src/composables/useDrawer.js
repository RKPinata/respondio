import { useFlowStore } from '@/stores'
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useDrawer() {
  const router = useRouter()
  const route = useRoute()
  const flowstore = useFlowStore()

  const nodeId = computed(() => route.query.nodeId)

  const isOpen = computed(() => {
    if (!nodeId.value || !flowstore.selectedNode) {
      closeDrawer()
      return false
    }

    return true
  })

  const openDrawer = (id) => {
    router.push({ query: { nodeId: id } })
  }

  const closeDrawer = () => {
    router.push({ query: {} })
  }

  return {
    nodeId,
    isOpen,
    openDrawer,
    closeDrawer,
  }
}
