import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

export function useDrawer() {
  const router = useRouter()
  const route = useRoute()

  const nodeId = computed(() => route.query.nodeId)

  const isOpen = computed(() => !!nodeId.value)

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
