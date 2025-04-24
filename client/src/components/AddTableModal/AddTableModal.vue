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
        <!-- Table Number Input -->
        <div class="mb-4">
          <label for="tableNumber" class="block text-sm font-medium mb-1">Table Number</label>
          <input
            id="tableNumber"
            v-model.number="tableNumber"
            type="number"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter table number"
          />
        </div>
        <!-- Seating Capacity Input -->
        <div class="mb-4">
          <label for="seatingCapacity" class="block text-sm font-medium mb-1">Seating Capacity</label>
          <input
            id="seatingCapacity"
            v-model.number="seatingCapacity"
            type="number"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
            placeholder="Enter seating capacity"
          />
        </div>
        <!-- Buttons -->
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
  
  // Props and emits
  const props = defineProps({
    show: Boolean,
    isEdit: Boolean,
    initialNumber: Number,
    initialCapacity: Number,
    tableId: [String, Number], // Optional: for edit mode
  });
  const emits = defineEmits(["close", "add", "edit"]);
  
  // Local state for form fields
  const tableNumber = ref(props.initialNumber || 0);
  const seatingCapacity = ref(props.initialCapacity || 0);
  
  // Watch for prop changes to update form values
  watch(
    () => props.initialNumber,
    (newValue) => {
      tableNumber.value = newValue || 0;
    }
  );
  
  watch(
    () => props.initialCapacity,
    (newValue) => {
      seatingCapacity.value = newValue || 0;
    }
  );
  
  // Submit handler
  function submit() {
    const number = tableNumber.value;
    const capacity = seatingCapacity.value;
  
    if (!number || !capacity) return; // Prevent submission if fields are empty
  
    const data = { tableNumber: number, seatingCapacity: capacity };
  
    if (props.isEdit) {
      emits("edit", data, props.tableId); // Pass data to edit handler
    } else {
      emits("add", data); // Pass data to add handler
    }
  
    // Reset form and close modal
    tableNumber.value = 0;
    seatingCapacity.value = 0;
    emits("close");
  }
  
  // Close modal function
  function close() {
    tableNumber.value = 0;
    seatingCapacity.value = 0;
    emits("close");
  }
  </script>
  