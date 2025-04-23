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
          <TableRow v-for="category in categories" :key="category._id">
            <TableCell class="font-medium">
              {{ category.name }}
            </TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <UiButton
                  variant="outline"
                  size="sm"
                  @click="openEditModal(category)"
                >
                  Edit
                </UiButton>
                <UiButton
                  variant="destructive"
                  size="sm"
                  @click="openDeleteDialog(category._id)"
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
    <AddCategoryModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddCategory"
    />

    <!-- Edit Category Modal -->
    <AddCategoryModal
      :show="showEditModal"
      :isEdit="true"
      :initialTitle="selectedCategory?.name"
      :categoryId="selectedCategory?._id"
      @close="showEditModal = false"
      @edit="handleEditCategory"
    />

    <!-- Delete Confirmation Dialog -->
    <UiDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Confirm Deletion</UiDialogTitle>
          <UiDialogDescription>
            Are you sure you want to delete this category? This action cannot be
            undone.
          </UiDialogDescription>
        </UiDialogHeader>
        <UiDialogFooter>
          <UiButton variant="outline" @click="showDeleteDialog = false">
            Cancel
          </UiButton>
          <UiButton variant="destructive" @click="confirmDeleteCategory">
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

// Service
import categoryService from "@/services/categoryService/categoryService";

// State
const categories = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const showDeleteDialog = ref(false);
const selectedCategory = ref(null);
const categoryToDelete = ref(null);

// In parent component
async function handleAddCategory(name) {
  try {
    const response = await categoryService.createCategory({ name });
    categories.value.push(response.data);
    showModal.value = false;
  } catch (error) {
    console.error("Add category error:", error);
    alert("Failed to add category. Please try again.");
  }
}

async function handleEditCategory(updatedName, categoryId) {
  try {
    await categoryService.updateCategory(categoryId, { name: updatedName });
    const index = categories.value.findIndex((cat) => cat._id === categoryId);
    if (index !== -1) {
      categories.value[index].name = updatedName;
    }
  } catch (error) {
    console.error("Update category error:", error);
    alert("Failed to update category. Please try again.");
  }
  selectedCategory.value = null;
  showEditModal.value = false;
}

function openDeleteDialog(categoryId) {
  categoryToDelete.value = categoryId;
  showDeleteDialog.value = true;
}

async function confirmDeleteCategory() {
  const categoryId = categoryToDelete.value;
  try {
    await categoryService.deleteCategory(categoryId);
    categories.value = categories.value.filter((cat) => cat._id !== categoryId);
    showDeleteDialog.value = false;
    categoryToDelete.value = null;
  } catch (error) {
    console.error("Delete category error:", error);
    alert("Failed to delete category. Please try again.");
  }
}

function openEditModal(category) {
  selectedCategory.value = { ...category };
  showEditModal.value = true;
}

// Fetch existing categories
onMounted(async () => {
  try {
    const response = await categoryService.getCategories();
    if (Array.isArray(response.data)) {
      categories.value = response.data;
    } else {
      console.error("Expected array but got:", response.data);
    }
  } catch (error) {
    console.error("Fetch categories error:", error);
    alert("Something went wrong. Try again.");
  }
});
</script>