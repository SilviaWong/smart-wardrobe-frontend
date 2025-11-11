import { createRouter, createWebHistory } from 'vue-router'

const Wardrobe = () => import('../pages/Wardrobe.vue')
const Statistics = () => import('../pages/Statistics.vue')
const Settings = () => import('../pages/Settings.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'wardrobe', component: Wardrobe },
    { path: '/statistics', name: 'statistics', component: Statistics },
    { path: '/settings', name: 'settings', component: Settings }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
