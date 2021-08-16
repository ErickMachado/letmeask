import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Auth from '@/views/Auth.vue'
import Room from '@/views/Room.vue'

const routes: Array<RouteRecordRaw> = [
  {
    component: Auth,
    name: 'auth',
    path: '/auth',
  },
  {
    component: Room,
    name: 'room',
    path: '/room/:id',
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
