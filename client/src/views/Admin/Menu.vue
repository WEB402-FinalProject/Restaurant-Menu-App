<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Menu Items</h2>
      <Button class="flex items-center gap-2" @click="showModal = true">
        <CirclePlus class="w-4 h-4 mr-2" /> Add Menu Item
      </Button>
    </div>

    <!-- Table -->
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Item Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Image</TableHead>
          <TableHead class="text-right">Price</TableHead>
          <TableHead class="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow v-for="(item, index) in menuItems" :key="index">
          <TableCell class="font-medium">{{ item.name }}</TableCell>
          <TableCell>{{ item.category }}</TableCell>
          <TableCell>{{ item.description }}</TableCell>
          <TableCell>
            <img :src="item.image" alt="menu item" class="w-12 h-12 object-cover rounded" />
          </TableCell>
          <TableCell class="text-right">${{ item.price.toFixed(2) }}</TableCell>
          <TableCell class="text-right">
            <div class="flex justify-end gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="destructive" size="sm">Delete</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>

    <!-- Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-2xl relative">
        <h2 class="text-xl font-semibold mb-4">Add Menu Item</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Image Upload -->
          <div class="flex flex-col items-center">
            <div class="w-full h-48 border rounded flex items-center justify-center bg-gray-100">
              <img v-if="imagePreview" :src="imagePreview" class="h-full object-cover" />
              <span v-else class="text-gray-500">No image selected</span>
            </div>
            <input type="file" accept="image/*" @change="handleImageUpload" class="mt-2" />
          </div>

          <!-- Form Fields -->
          <div class="flex flex-col gap-3">
            <input v-model="newItem.name" type="text" placeholder="Enter menu item title" class="border rounded p-2" />

            <select v-model="newItem.category" class="border rounded p-2">
              <option disabled value="">Select a category</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>

            <input v-model="newItem.price" type="number" placeholder="Price ($)" class="border rounded p-2" />

            <textarea v-model="newItem.description" placeholder="Enter description" class="border rounded p-2 h-24"></textarea>
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex justify-end gap-2 mt-6">
          <Button variant="outline" @click="closeModal">Cancel</Button>
          <Button @click="addItem">Create</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import { CirclePlus } from 'lucide-vue-next'
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
    category: "Main Course"
  },
  {
    name: 'Caesar Salad',
    description: 'Crisp romaine lettuce with Caesar dressing',
    image: 'https://via.placeholder.com/50',
    price: 7.49,
    category: "Salads"
  },
  {
    name: 'Chocolate Milkshake',
    description: 'Rich and creamy with chocolate syrup',
    image: 'https://via.placeholder.com/50',
    price: 4.25,
    category: "Drinks"
  },
])

// Modal control
const showModal = ref(false)

// Dropdown categories
const categories = ['Main Course', 'Salads', 'Drinks', 'Desserts']

// New item model
const newItem = ref({
  name: '',
  category: '',
  description: '',
  image: '',
  price: 0
})

const imagePreview = ref('')

// Image Upload
function handleImageUpload(event) {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      imagePreview.value = reader.result
      newItem.value.image = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// Add item to list
function addItem() {
  if (!newItem.value.name || !newItem.value.category || !newItem.value.price) return
  menuItems.value.push({ ...newItem.value })
  closeModal()
}

// Reset and close modal
function closeModal() {
  newItem.value = {
    name: '',
    category: '',
    description: '',
    image: '',
    price: 0
  }
  imagePreview.value = ''
  showModal.value = false
}
</script>

<style scoped>
img {
  border-radius: 0.375rem;
}
</style>
