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
            <TableHead>Public Link</TableHead>
            <TableHead class="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-for="table in tables" :key="table._id">
            <TableCell class="font-medium">{{ table.tableNumber }}</TableCell>
            <TableCell>{{ table.seatingCapacity }}</TableCell>
            <TableCell>
              <a
                :href="table.orderingLink"
                target="_blank"
                class="text-blue-600 underline text-sm"
              >
                Open Link
              </a>
            </TableCell>
            <TableCell class="text-right">
              <div class="flex flex-col items-end gap-1">
                <div class="flex gap-2">
                  <UiButton
                    variant="outline"
                    size="sm"
                    @click="openEditModal(table)"
                    >Edit</UiButton
                  >
                  <UiButton
                    variant="destructive"
                    size="sm"
                    @click="openDeleteDialog(table._id)"
                    >Delete</UiButton
                  >
                  <UiButton
                    variant="outline"
                    size="sm"
                    @click="openQRModal(table.orderingLink)"
                  >
                    <QrCode class="w-4 h-4" />
                  </UiButton>
                </div>
                <a
                  :href="table.orderingLink"
                  target="_blank"
                  class="text-blue-500 underline text-xs"
                >
                  Open Link
                </a>
                <button
                  @click="copyToClipboard(table.orderingLink)"
                  class="text-gray-500 text-xs hover:text-gray-800"
                >
                  Copy Link
                </button>
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
  <UiDialog :open="showQRModal" @update:open="showQRModal = $event">
    <UiDialogContent>
      <UiDialogHeader>
        <UiDialogTitle>Table QR Code</UiDialogTitle>
        <UiDialogDescription
          >Scan this code to open the menu.</UiDialogDescription
        >
      </UiDialogHeader>
      <div class="flex justify-center my-4">
        <QrcodeVue :value="selectedQRLink" :size="200" />
      </div>
      <UiDialogFooter class="flex justify-end">
        <UiButton @click="copyToClipboard(selectedQRLink)">
          <Copy class="w-4 h-4 mr-2" /> Copy Link
        </UiButton>
        <UiButton variant="outline" @click="showQRModal = false"
          >Close</UiButton
        >
      </UiDialogFooter>
    </UiDialogContent>
  </UiDialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CirclePlus } from "lucide-vue-next";
import { createIcons, icons } from "lucide";
createIcons({ icons });
import QrcodeVue from "qrcode.vue";
import { Copy, QrCode } from "lucide-vue-next";

function openQRModal() {
  selectedQRLink.value = link;
  showQRModal.value = true;
}

function copyToClipboard() {
  navigator.clipboard.writeText(text).then(() => {
    alert("Link copied to clipboard!");
  }, () => {
    alert("Failed to copy link.");
  });
}

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
const showQRModal = ref(false);
const selectedQRLink = ref("");

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
