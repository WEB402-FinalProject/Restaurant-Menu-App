<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-semibold mb-4">
        {{ isEdit ? "Edit Table" : "Add Table" }}
      </h3>
      <div class="mb-4">
        <label for="tableNumber" class="block text-sm font-medium mb-1"
          >Table Number</label
        >
        <input
          id="tableNumber"
          v-model="tableNumber"
          type="text"
          class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
        />
      </div>
      <div class="flex justify-end gap-2">
        <UiButton variant="outline" @click="close">Cancel</UiButton>
        <UiButton @click="submit">{{ isEdit ? "Save" : "Add" }}</UiButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Button as UiButton } from "@/components/ui/button";

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  initialNumber: String,
  tableId: [String, Number], // Optional: for edit mode
});

const emits = defineEmits(["close", "add", "edit"]);

const tableNumber = ref(props.initialNumber || "");

// Sync when initialNumber prop changes
watch(
  () => props.initialNumber,
  (newValue) => {
    tableNumber.value = newValue || "";
  }
);

function submit() {
  const number = tableNumber.value.trim();
  if (!number) return;

  if (props.isEdit) {
    emits("edit", number, props.tableId);
  } else {
    emits("add", number);
  }

  tableNumber.value = "";
  emits("close");
}

function close() {
  tableNumber.value = "";
  emits("close");
}
</script>
