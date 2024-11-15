import { createRouter, createWebHistory } from 'vue-router'

import FlowchartView from '@/views/FlowchartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'flowchart',
      component: FlowchartView,
    },
  ],
})

export default router
