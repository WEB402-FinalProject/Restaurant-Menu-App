<template>
  <div class="flex flex-col items-center mt-10 gap-8">
    <h1 class="text-3xl font-bold">Our Menu</h1>
    <div class="flex w-full max-w-sm items-center gap-1.5">
      <Input id="text" class="p-5" type="text" placeholder="Search Menu Items..." />
      <Button class="p-5" type="submit">Search</Button>
    </div>   
  </div>

  <!-- Looping Cards -->
  <div class="flex flex-wrap justify-center gap-4 mt-8">
    <div v-for="(item, index) in menuItems" :key="index">
      <Card class="w-[280px] h-95 rounded-t-md p-0">
        <CardContent class="p-0 ">
          <img :src="item.image" alt="Menu image" class="w-full h-48 object-cover rounded-t-md" />
        </CardContent>
        <CardHeader>
          <CardTitle class="font-bold text-2xl">{{ item.title }}</CardTitle>
          <CardDescription class="text-[15px]">{{ item.description }}</CardDescription>
        </CardHeader>
        <CardFooter class="flex justify-between px-6 pb-6">
          <Button class="w-full">{{ item.buttonText }}</Button>
        </CardFooter>
      </Card>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const menuItems = ref([
  { title: 'Appetizers', description: 'Start your meal with our delicious appetizers', buttonText: 'Browse Appetizers', image: '/Appetizers.avif' },
  { title: 'Main Course', description: `Enjoy our chef's special main courses`, buttonText: 'Browse Main Course', image: '/Maincourse.avif' },
  { title: 'Desserts', description: 'Finish your meal with something sweet', buttonText: 'Browse Desserts', image: 'Desserts.avif'},
  { title: 'Beverages', description: 'Refresh yourself with our selection of drinks', buttonText: 'Browse Beverages', image: 'Beverage.avif' },
])
</script>
