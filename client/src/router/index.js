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
import Restaurant from '@/views/Admin/Restaurant.vue'
import Table from '@/views/Admin/Table.vue'
import Orders from '@/views/Admin/Orders.vue' // ✅ New import
import SelectRestaurant from '@/views/Admin/SelectRestaurant.vue'
import MenuByCategory from '@/views/Users/MenuByCategory.vue'

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'category', component: Category },
      { path: 'menu', component: Menu },
      { path: 'restaurant', component: Restaurant },
      { path: 'table', component: Table },
      { path: 'orders', component: Orders }, // ✅ New route for Orders page
    ],
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('selectedRestaurant')) {
        next('/select-restaurant');
      } else {
        next();
      }
    }
  },
  {
    path: '/',
    component: UserLayout,
    children: [
      { path: '', component: UserHome },
      { path: 'menu/:category', component: MenuByCategory },
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
  },
  {
    path: '/select-restaurant',
    name: 'SelectRestaurant',
    component: SelectRestaurant
  },
  {
    path: "/r/:restaurantId/t/:tableNumber",
    name: "PublicMenu",
    component: () => import("@/views/Public/MenuView.vue"),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
