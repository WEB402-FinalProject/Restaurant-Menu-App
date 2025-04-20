import { createRouter, createWebHistory } from 'vue-router'

// Import components/pages
import Home from '@/views/Home.vue'
import SignIn from '@/views/SignIn.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/sign-in',
    name: 'SignIn',
    component: SignIn
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
