<script setup>
import Node from './flowchart-node/Node.vue'
import mockData from '@/mock/mockData.json'

const nodeDetails = mockData[0]
</script>
<template>
  <div class="bg-slate-300 flex-grow //test// flex items-center justify-center">
    <Node :nodeDetails="nodeDetails" />
  </div>
</template>
