import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

// Pages
import AdminDashboard from '@/views/Admin/Dashboard.vue'
import UserHome from '@/views/Users/Home.vue'

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'users', component: AdminUsers }
    ]
  },
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },
      { path: 'profile', component: UserProfile }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
