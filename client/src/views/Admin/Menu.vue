<template>
  <div class="p-6 w-[70vw]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Menus</h2>
      <UiButton class="flex items-center gap-2" @click="showModal = true">
        <CirclePlus class="w-4 h-4" /> Add Menu
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
          <TableRow v-for="(menu, index) in menus" :key="index">
            <TableCell class="font-medium">
              {{ menu.name }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <UiButton variant="outline" size="sm" @click="openEditModal(menu)">
                  Edit
                </UiButton>
                <UiButton variant="destructive" size="sm" @click="handleDelete(menu.id)">
                  Delete
                </UiButton>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </div>

    <!-- Add Menu Modal -->
    <AddMenuModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddMenu"
    />

    <!-- Edit Menu Modal -->
    <EditMenuModal
      :show="showEditModal"
      :menu="selectedMenu"
      @close="closeEditModal"
      @update="handleUpdateMenu"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { CirclePlus } from 'lucide-vue-next'

// UI Components
import { Button as UiButton } from '@/components/ui/button'
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Modal Components
import AddMenuModal from '@/components/AddMenuModal/AddMenuModal.vue'
import EditMenuModal from '@/components/EditMenuModal/EditMenuModal.vue'

// Service
import menuService from '@/services/menuService/menuService'

// State
const menus = ref([])
const showModal = ref(false)
const showEditModal = ref(false)
const selectedMenu = ref(null)

// Event Handlers
function handleAddMenu(menu) {
  menus.value.push(menu)
  showModal.value = false
}

function handleDelete(id) {
  menuService.deleteMenu(id)
    .then(() => {
      menus.value = menus.value.filter(menu => menu.id !== id)
    })
    .catch(error => {
      console.error("Delete error:", error)
      alert('Failed to delete menu. Please try again.')
    })
}

function openEditModal(menu) {
  selectedMenu.value = menu
  showEditModal.value = true
}

function closeEditModal() {
  showEditModal.value = false
  selectedMenu.value = null
}

function handleUpdateMenu(updatedMenu) {
  const index = menus.value.findIndex(menu => menu.id === updatedMenu.id)
  if (index !== -1) {
    menus.value[index] = updatedMenu
  }
  closeEditModal()
}

// Fetch menus
onMounted(async () => {
  try {
    const response = await menuService.getMenus()
    if (Array.isArray(response.data)) {
      menus.value = response.data
    } else {
      console.error('Expected array but got:', response.data)
    }
  } catch (error) {
    console.error('Fetch menus error:', error)
    alert('Something went wrong. Try again.')
  }
})
</script>

<style scoped lang="scss"></style>
