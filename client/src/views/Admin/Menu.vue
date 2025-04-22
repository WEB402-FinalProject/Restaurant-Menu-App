<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Menu Items</h2>
        <Button class="flex items-center gap-2">
          <CirclePlus class="w-4 h-4 mr-2" /> Add Menu Item
        </Button>
      </div>
  
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Item Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Image</TableHead>
            <TableHead class="text-right">Price</TableHead>
            <TableHead class="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
          <TableRow v-for="(item, index) in menuItems" :key="index">
            <TableCell class="font-medium">{{ item.name }}</TableCell>
            <TableCell>{{ item.description }}</TableCell>
            <TableCell>
              <img :src="item.image" alt="menu item" class="w-12 h-12 object-cover rounded" />
            </TableCell>
            <TableCell class="text-right">${{ item.price }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Button } from '@/components/ui/button'
  import { CirclePlus } from 'lucide-vue-next'
  import { createIcons, icons } from 'lucide'
  createIcons({ icons })
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from '@/components/ui/table'
  
  // Sample data
  const menuItems = ref([
    {
      name: 'Margherita Pizza',
      description: 'Classic cheese and tomato pizza',
      image: 'https://via.placeholder.com/50',
      price: 10.99,
    },
    {
      name: 'Caesar Salad',
      description: 'Crisp romaine lettuce with Caesar dressing',
      image: 'https://via.placeholder.com/50',
      price: 7.49,
    },
    {
      name: 'Chocolate Milkshake',
      description: 'Rich and creamy with chocolate syrup',
      image: 'https://via.placeholder.com/50',
      price: 4.25,
    },
  ])
  </script>
  
  <style lang="scss" scoped>
  img {
    border-radius: 0.375rem;
  }
  </style>
  