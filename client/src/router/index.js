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

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'category', component: Category },
      { path: 'menu', component: Menu },


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
    path: '/register',
    name: 'Register',
    component: Register
  },

    {
      path: '/admin',
      component: AdminLayout,
      children: [
        { path: 'menu', component: Menu },
      ]
    },  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
