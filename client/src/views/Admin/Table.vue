<template>
  <div class="p-6 w-[70vw]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Tables</h2>
      <UiButton class="flex items-center gap-2" @click="showModal = true">
        <CirclePlus class="w-4 h-4" /> Add Table
      </UiButton>
    </div>

    <div class="overflow-x-auto">
      <UiTable class="w-full">
        <TableHeader>
          <TableRow>
            <TableHead class="w-[100px]">Name</TableHead>
            <TableHead>Seats</TableHead>
            <TableHead class="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="table in tables" :key="table._id">
            <TableCell class="font-medium">{{ table.tableNumber }}</TableCell>
            <TableCell>{{ table.seatingCapacity }}</TableCell>
            <TableCell class="text-right">
              <div class="flex justify-end gap-2">
                <UiButton
                  variant="outline"
                  size="sm"
                  @click="openEditModal(table)"
                >
                  Edit
                </UiButton>
                <UiButton
                  variant="destructive"
                  size="sm"
                  @click="openDeleteDialog(table._id)"
                >
                  Delete
                </UiButton>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </UiTable>
    </div>

    <!-- Add Table Modal -->
    <AddTableModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddTable"
    />

    <!-- Edit Table Modal -->
    <AddTableModal
      :show="showEditModal"
      :isEdit="true"
      :initialData="selectedTable"
      :tableId="selectedTable?._id"
      @close="showEditModal = false"
      @edit="handleEditTable"
    />

    <!-- Delete Confirmation Dialog -->
    <UiDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Confirm Deletion</UiDialogTitle>
          <UiDialogDescription>
            Are you sure you want to delete this table? This action cannot be
            undone.
          </UiDialogDescription>
        </UiDialogHeader>
        <UiDialogFooter>
          <UiButton variant="outline" @click="showDeleteDialog = false">
            Cancel
          </UiButton>
          <UiButton variant="destructive" @click="confirmDeleteTable">
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
  DialogTitle as UiDialogTitle,
  DialogDescription as UiDialogDescription,
  DialogFooter as UiDialogFooter,
} from "@/components/ui/dialog";

// Modal Component
import AddTableModal from "@/components/AddTableModal/AddTableModal.vue";

// Service
import tableService from "@/services/tableService/tableService";

// State
const tables = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const showDeleteDialog = ref(false);
const selectedTable = ref(null);
const tableToDelete = ref(null);

// Handlers
async function handleAddTable(tableData) {
  try {
    const res = await tableService.createTable(tableData);
    tables.value.push(res.data);
    showModal.value = false;
  } catch (error) {
    console.error("Add table error:", error);
    alert("Failed to add table. Please try again.");
  }
}

async function handleEditTable(updatedData, tableId) {
  try {
    await tableService.updateTable(tableId, updatedData);
    const index = tables.value.findIndex((tbl) => tbl._id === tableId);
    if (index !== -1) {
      tables.value[index] = { ...tables.value[index], ...updatedData };
    }
  } catch (error) {
    console.error("Edit table error:", error);
    alert("Failed to update table. Please try again.");
  }
  selectedTable.value = null;
  showEditModal.value = false;
}

function openDeleteDialog(id) {
  tableToDelete.value = id;
  showDeleteDialog.value = true;
}

async function confirmDeleteTable() {
  const id = tableToDelete.value;
  try {
    await tableService.deleteTable(id);
    tables.value = tables.value.filter((t) => t._id !== id);
    showDeleteDialog.value = false;
    tableToDelete.value = null;
  } catch (error) {
    console.error("Delete table error:", error);
    alert("Failed to delete table. Please try again.");
  }
}

function openEditModal(table) {
  selectedTable.value = { ...table };
  showEditModal.value = true;
}

onMounted(async () => {
  try {
    const res = await tableService.getTables();
    tables.value = res.data;
  } catch (error) {
    console.error("Fetch tables error:", error);
    alert("Failed to load tables.");
  }
});
</script>
