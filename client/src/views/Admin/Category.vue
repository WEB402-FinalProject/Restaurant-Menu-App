<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold">Categories</h2>
        <Button class="flex items-center gap-2">
          <CirclePlus class="w-4 h-4 mr-2" /> Add Category
        </Button>
      </div>
  
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Name</TableHead>
            <TableHead class="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
  
        <TableBody>
          <TableRow v-for="(category, index) in categories" :key="index">
            <TableCell class="font-medium">
              {{ category }}
            </TableCell>
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
  
  // Better naming: 'categories' for a list
  const categories = ref(['Appetizers', 'Maincourse', 'Beverages', 'Desserts'])
  </script>
  
  <style lang="scss" scoped>
  </style>
  