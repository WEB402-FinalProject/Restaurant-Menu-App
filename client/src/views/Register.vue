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

const fullname = ref('')
const username = ref('')
const password = ref('')
const router = useRouter()

const handleRegister = async (e) => {
  e.preventDefault()

  try {
    const response = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullname.value,
        username: username.value,
        password: password.value,
      }),
    })

    const data = await response.json()

    if (response.ok) {
      // Registration success
      alert('Registration successful! Please log in.')
      router.push('/login') // Redirect to login page
    } else {
      // Registration failed
      alert(data.message || 'Registration failed')
    }
  } catch (error) {
    console.error('Registration error:', error)
    alert('Something went wrong. Try again.')
  }
}
</script>

<template>
  <div class="flex items-center justify-center h-[100vh]">
    <Card class="w-[350px]">
      <CardHeader class="text-center">
        <CardTitle>Register</CardTitle>
        <CardDescription>Create a new account</CardDescription>
      </CardHeader>
      <form @submit="handleRegister">
        <CardContent>
          <div class="grid items-center w-full gap-4">
            <div class="flex flex-col space-y-1.5 gap-4">
              <div class="flex flex-col space-y-1.5">
                <Label for="name">Full Name</Label>
                <Input id="name" v-model="fullname" placeholder="Full Name" />
              </div>
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
          <Button class="w-full">Register</Button>
        </CardFooter>
      </form>
    </Card>
  </div>
</template>