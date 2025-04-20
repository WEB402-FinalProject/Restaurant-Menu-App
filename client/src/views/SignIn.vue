<script setup>
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
</script>

<template>
  <div class="flex items-center justify-center h-[100vh]">
  <Card class="w-[350px]">
    <CardHeader class="text-center">
      <CardTitle>Admin Login</CardTitle>
    </CardHeader>
    <CardContent>
      <form>
        <div class="grid items-center w-full gap-4">
          <div class="flex flex-col space-y-1.5 gap-4">
            <div class="flex flex-col space-y-1.5">
              <Label for="name">Username</Label>
            <Input id="name" placeholder="Username" />
            </div>
            <div class="flex flex-col space-y-1.5">
              <Label for="password">Password</Label>
            <Input id="password" placeholder="Password" />
            </div>
          </div>
            </div>
          </form>
    </CardContent>
    <CardFooter class="flex justify-between px-6 pb-6">
      <Button class="w-full">Login</Button>
    </CardFooter>
  </Card>
</div>
</template>