<template>
  <div
    v-if="show"
    class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    @click.self="close"
  >
    <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
      <h3 class="text-xl font-semibold mb-4">
        {{ isEdit ? "Edit Restaurant" : "Add Restaurant" }}
      </h3>
      <div class="mb-4">
        <label for="restaurantName" class="block text-sm font-medium mb-1"
          >Name</label
        >
        <input
          id="restaurantName"
          v-model="restaurantName"
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
import restaurantService from "@/services/restaurantService/restaurantService";

const props = defineProps({
  show: Boolean,
  isEdit: Boolean,
  initialName: String,
  restaurantId: [String, Number], // Optional: for edit mode
});

const emits = defineEmits(["close", "add", "edit"]);

const restaurantName = ref(props.initialName || "");

// Sync restaurantName with initialName when it changes
watch(
  () => props.initialName,
  (newValue) => {
    restaurantName.value = newValue || "";
  }
);

async function submit() {
  const name = restaurantName.value.trim();
  if (!name) return;

  if (props.isEdit) {
    emits("edit", name, props.restaurantId);
  } else {
    emits("add", name);
  }

  restaurantName.value = "";
  emits("close");
}

function close() {
  restaurantName.value = "";
  emits("close");
}
</script>

<style scoped lang="scss"></style>
