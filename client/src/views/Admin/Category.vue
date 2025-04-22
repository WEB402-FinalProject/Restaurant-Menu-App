<template>
  <div class="p-6 w-[70vw]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Categories</h2>
      <UiButton class="flex items-center gap-2" @click="showModal = true">
        <CirclePlus class="w-4 h-4" /> Add Category
      </UiButton>
    </div>

    <div class="overflow-x-auto">
      <UiTable class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Name</TableHead>
            <TableHead class="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="(category, index) in categories" :key="index">
            <TableCell class="font-medium">
              {{ category.name }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <UiButton variant="outline" size="sm">Edit</UiButton>
                <UiButton variant="destructive" size="sm">Delete</UiButton>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </div>

    <!-- Reusable Modal Component -->
    <AddCategoryModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddCategory"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CirclePlus } from 'lucide-vue-next'
import { createIcons, icons } from 'lucide'
createIcons({ icons })

// UI Components
import {
  Button as UiButton,
} from '@/components/ui/button'
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Modal Component
import AddCategoryModal from '@/components/AddCategoryModal/AddCategoryModal.vue'

// Service
import categoryService from '@/services/categoryService/categoryService'

// State
const categories = ref([])
const showModal = ref(false)

// Event Handlers
function handleAddCategory(name) {
  categories.value.push({ name })
  showModal.value = false
}

// Fetch existing categories
onMounted(async () => {
  try {
    const response = await categoryService.getCategories()
    if (Array.isArray(response.data)) {
      categories.value = response.data
    } else {
      console.error('Expected array but got:', response.data)
    }
  } catch (error) {
    console.error('Fetch categories error:', error)
    alert('Something went wrong. Try again.')
  }
})
</script>

<style scoped lang="scss">
</style>
