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
            <TableHead class="w-[100px]">Image</TableHead>
            <TableHead class="w-[100px]">Name</TableHead>
            <TableHead class="w-[100px]">Category</TableHead>
            <TableHead class="w-[100px]">Price($)</TableHead>
            <TableHead class="w-[100px]">Description</TableHead>

            <TableHead class="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="menu in menus" :key="menu._id">
            <TableCell class="font-medium">
              <div
                class="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-md border"
              >
                <img
                  :src="menu.image || '/placeholder.svg'"
                  alt="Menu item preview"
                  class="object-cover w-full h-full"
                />
              </div>
            </TableCell>
            <TableCell class="font-medium">
              {{ menu.title }}
            </TableCell>
            <TableCell class="font-medium">
              {{ menu.category?.name }}
            </TableCell>
            <TableCell class="font-medium">
              {{ menu.price }}
            </TableCell>
            <TableCell class="font-medium">
              {{ menu.description }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <UiButton
                  variant="outline"
                  size="sm"
                  @click="openEditModal(menu)"
                >
                  Edit
                </UiButton>
                <UiButton
                  variant="destructive"
                  size="sm"
                  @click="openDeleteDialog(menu._id)"
                >
                  Delete
                </UiButton>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </div>

    <!-- Add Category Modal -->
    <MenuModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddMenu"
    />

    <!-- Edit Category Modal -->
    <MenuModal
      :show="showEditModal"
      :isEdit="true"
      :initialData="selectedMenu"
      @close="showEditModal = false"
      @edit="handleEditMenu"
    />

    <!-- Delete Confirmation Dialog -->
    <UiDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Confirm Deletion</UiDialogTitle>
          <UiDialogDescription>
            Are you sure you want to delete this menu item? This action cannot
            be undone.
          </UiDialogDescription>
        </UiDialogHeader>
        <UiDialogFooter>
          <UiButton variant="outline" @click="showDeleteDialog = false">
            Cancel
          </UiButton>
          <UiButton variant="destructive" @click="confirmDeleteMenu">
            Delete
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CirclePlus } from "lucide-vue-next";
import { createIcons, icons } from "lucide";
createIcons({ icons });

// UI Components
import { Button as UiButton } from "@/components/ui/button";
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog as UiDialog,
  DialogContent as UiDialogContent,
  DialogHeader as UiDialogHeader,
  DialogTitle as Ui_DIALOGTitle,
  DialogDescription as UiDialogDescription,
  DialogFooter as UiDialogFooter,
} from "@/components/ui/dialog";

// Modal Component
import AddCategoryModal from "@/components/AddCategoryModal/AddCategoryModal.vue";
import MenuModal from "@/components/MenuModal/MenuModal.vue";

// Service
import menuService from "@/services/menuService/menuService";

// State
const menus = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const showDeleteDialog = ref(false);
const selectedMenu = ref(null);
const menuToDelete = ref(null);

// In parent component
async function handleAddMenu(formData) {
  try {
    const response = await menuService.createMenu({
      ...formData,
      category: formData.categoryId,
      image: formData.imageUrl,
    });
    menus.value.push(response.data);
    showModal.value = false;
  } catch (error) {
    console.error("Add category error:", error);
    alert("Failed to add category. Please try again.");
  }
}

async function handleEditMenu(formData) {
  try {
    await menuService.updateMenu(formData.id, {
      ...formData,
      image: formData.imageUrl,
    });
    const index = menus.value.findIndex((menu) => menu._id === formData.id);
    if (index !== -1) {
      menus.value[index] = formData;
    }
  } catch (error) {
    console.error("Update category error:", error);
    alert("Failed to update category. Please try again.");
  }
  selectedMenu.value = null;
  showEditModal.value = false;
}

function openDeleteDialog(menuId) {
  menuToDelete.value = menuId;
  showDeleteDialog.value = true;
}

async function confirmDeleteMenu() {
  const menuId = menuToDelete.value;
  try {
    await menuService.deleteMenu(menuId);
    menus.value = menus.value.filter((menu) => menu._id !== menuId);
    showDeleteDialog.value = false;
    menuToDelete.value = null;
  } catch (error) {
    console.error("Delete menu error:", error);
    alert("Failed to delete menu. Please try again.");
  }
}

function openEditModal(menu) {
  selectedMenu.value = { ...menu };
  showEditModal.value = true;
}

// Fetch existing menus
onMounted(async () => {
  try {
    const response = await menuService.getMenus();
    if (Array.isArray(response.data)) {
      menus.value = response.data;
    } else {
      console.error("Expected array but got:", response.data);
    }
  } catch (error) {
    console.error("Fetch menus error:", error);
    alert("Something went wrong. Try again.");
  }
});
</script>