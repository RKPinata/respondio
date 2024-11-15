<script setup>
import Button from '@/components/ui/button/Button.vue'
import { useFlowStore } from '@/stores'

const flowstore = useFlowStore()

const handleSubmit = () => {
  flowstore.handleCreateNewNode({
    type: 'sendMessage',
    name: 'New Message',
  })
}
</script>
<template>
  <Button @click="handleSubmit">Click me</Button>
</template>
