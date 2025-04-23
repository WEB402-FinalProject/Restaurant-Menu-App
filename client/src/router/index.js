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
import SelectRestaurant from '@/views/Admin/SelectRestaurant.vue' // Import SelectRestaurant

const routes = [
  {
    path: '/admin',
    component: AdminLayout,
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'category', component: Category },
      { path: 'menu', component: Menu },
      { path: 'restaurant', component: Restaurant }, // Add this route for Restaurant CRUD
    ],
    // Add navigation guard here for admin routes
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem('selectedRestaurant')) {
        next('/select-restaurant'); // Redirect to select restaurant if not selected
      } else {
        next(); // Proceed to the requested route
      }
    }
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
  },
  {
    path: '/select-restaurant', // Add this route for selecting restaurant
    name: 'SelectRestaurant',
    component: SelectRestaurant
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
