import { createRouter, createWebHistory } from 'vue-router'

// Layouts
import AdminLayout from '@/layouts/AdminLayout.vue'
import UserLayout from '@/layouts/UserLayout.vue'

// Pages
import AdminDashboard from '@/views/Admin/Dashboard.vue'
import UserHome from '@/views/Users/Home.vue'
import SignIn from '@/views/SignIn.vue'
import Register from '@/views/Register.vue'
import Category from '@/views/Admin/Category.vue'
import Menu from '@/views/Admin/Menu.vue'
import Restaurant from '@/views/Admin/Restaurant.vue' // Add this import for the Restaurant CRUD

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'category', component: Category },
      { path: 'menu', component: Menu },
      { path: 'restaurant', component: Restaurant }, // Add this route for Restaurant CRUD
    ]
  },
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },
    ]
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/login',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
