<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'vue-router'
import authService from '../services/authService/authService'

const username = ref('')
const password = ref('')
const router = useRouter()


const handleLogin = async (e) => {
  e.preventDefault()

  try {
    const response = await authService.login(username.value, password.value)
    // const data =await response.data.json()
    
    if (response.statusText === "OK") {
      // Login success - handle redirect or token save
      alert('Login successful!')
      router.push('/admin/dashboard')
      // router.push('/select-restaurant')
    } else {
      // Login failed
      alert(data.message || 'Login failed')
    }
  } catch (error) {
    console.error('Login error:', error)
    alert('Something went wrong. Try again.')
  }
}
</script>
  
<template>
  <div class="flex items-center justify-center h-[100vh]">
  <Card class="w-[350px]">
    <CardHeader class="text-center">
      <CardTitle>Admin Login</CardTitle>
    </CardHeader>
      <form @submit="handleLogin">
      <CardContent>
  <div class="grid items-center w-full gap-4">
    <div class="flex flex-col space-y-1.5 gap-4">
      <div class="flex flex-col space-y-1.5">
        <Label for="name">Username</Label>
        <Input id="name" v-model="username" placeholder="Username" />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="password">Password</Label>
        <Input id="password" v-model="password" placeholder="Password" type="password" />
      </div>
    </div>
  </div>
</CardContent>
<CardFooter class="flex justify-between px-6 pb-6 mt-6">
      <Button class="w-full">Login</Button>
    </CardFooter>
  </form>
  </Card>
</div>
</template>