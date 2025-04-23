<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-5xl">
        <h3 class="text-xl font-semibold mb-4">
          {{ isEdit ? "Edit Menu" : "Add Menu" }}
        </h3>
        <div class="grid gap-6 py-4 md:grid-cols-2">
          <!-- Left Column - Image Upload -->
          <div
            class="flex flex-col items-center justify-center space-y-4 rounded-md border p-6"
          >
            <div
              class="relative aspect-square w-full max-w-[280px] overflow-hidden rounded-md border"
            >
              <img
                :src="imageUrl || '/placeholder.svg'"
                alt="Menu item preview"
                class="object-cover w-full h-full"
              />
            </div>
            <div class="w-full">
              <input
                id="image"
                type="file"
                ref="fileInput"
                @change="handleImageChange"
                accept="image/*"
                class="hidden"
              />
              <UiButton
                variant="outline"
                class="w-full"
                @click="triggerFileInput"
              >
                <svg
                  class="mr-2 h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16V4m0 0L3 8m4-4l4 4m6 8v6m-10 0h14"
                  ></path>
                </svg>
                {{ isEdit ? "Change Image" : "Upload Image" }}
              </UiButton>
              <p
                v-if="errors.image"
                class="mt-1 text-sm text-destructive text-center"
              >
                {{ errors.image }}
              </p>
            </div>
          </div>
          <!-- Right Column - Form Fields -->
          <div class="space-y-4">
            <!-- Title -->
            <div class="flex flex-col space-y-2">
              <Label for="title">Title</Label>
              <Input
                id="title"
                v-model="title"
                placeholder="Enter menu item title"
              />
              <p v-if="errors.title" class="text-sm text-destructive">
                {{ errors.title }}
              </p>
            </div>
  
            <!-- Category -->
            <div class="flex flex-col space-y-2">
              <Label for="category">Category</Label>
              <Select v-model="categoryId">
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem
                    v-for="category in categories"
                    :key="category._id"
                    :value="category._id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectContent>
              </Select>
              <p v-if="errors.category" class="text-sm text-destructive">
                {{ errors.category }}
              </p>
            </div>
  
            <!-- Price -->
            <div class="flex flex-col space-y-2">
              <Label for="price">Price ($)</Label>
              <Input
                id="price"
                v-model="price"
                placeholder="0.00"
                type="number"
                step="0.01"
                min="0"
              />
              <p v-if="errors.price" class="text-sm text-destructive">
                {{ errors.price }}
              </p>
            </div>
  
            <!-- Description -->
            <div class="flex flex-col space-y-2">
              <Label for="description">Description</Label>
              <Textarea
                id="description"
                v-model="description"
                placeholder="Enter menu item description"
                :rows="4"
              />
              <p v-if="errors.description" class="text-sm text-destructive">
                {{ errors.description }}
              </p>
            </div>
          </div>
        </div>
  
        <div class="flex justify-end gap-2">
          <UiButton variant="outline" @click="close">Cancel</UiButton>
          <UiButton @click="submit">{{ isEdit ? "Save" : "Add" }}</UiButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch, onMounted } from "vue";
  import { Button as UiButton } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";
  import { Textarea } from "@/components/ui/textarea";
  import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  } from "@/components/ui/select";
  import categoryService from "@/services/categoryService/categoryService";
  
  // Props
  const props = defineProps({
    show: Boolean,
    isEdit: Boolean,
    initialData: Object, // For edit mode: { title, categoryId, price, description, imageUrl, id }
  });
  
  // Emits
  const emits = defineEmits(["close", "add", "edit"]);
  
  // Reactive state
  const title = ref("");
  const categoryId = ref("");
  const price = ref("");
  const description = ref("");
  const imageUrl = ref("");
  const imageFile = ref(null);
  const errors = ref({});
  const fileInput = ref(null);
  const categories = ref([]);
  
  // Fetch categories
  async function fetchCategories() {
    try {
      const response = await categoryService.getCategories();
      categories.value = response.data; // Assuming response.data is [{ id, name }, ...]
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  }
  
  // Initialize form data for edit mode
  watch(
    () => props.initialData,
    (newData) => {
      if (newData && props.isEdit) {
        title.value = newData.title || "";
        categoryId.value = newData.category._id || "";
        price.value = newData.price ? newData.price.toString() : "";
        description.value = newData.description || "";
        imageUrl.value = newData.image || "";
        imageFile.value = null; // Reset file input
      }
    },
    { immediate: true }
  );
  
  // Load categories on mount
  onMounted(() => {
    fetchCategories();
  });
  
  // Image handling
  const triggerFileInput = () => {
    fileInput.value?.click();
  };
  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageFile.value = file;
      imageUrl.value = URL.createObjectURL(file);
    } else {
      imageFile.value = null;
      imageUrl.value = props.initialData?.imageUrl || "";
    }
  };
  
  // Form submission
  const submit = () => {
    // Reset errors
    errors.value = {};
  
    // Basic validation
    let isValid = true;
    if (!title.value.trim()) {
      errors.value.title = "Title is required";
      isValid = false;
    }
    if (!categoryId.value) {
      errors.value.category = "Category is required";
      isValid = false;
    }
    if (!price.value || parseFloat(price.value) <= 0) {
      errors.value.price = "Price must be greater than 0";
      isValid = false;
    }
    if (!description.value.trim()) {
      errors.value.description = "Description is required";
      isValid = false;
    }
    if (!props.isEdit && !imageFile.value) {
      errors.value.image = "Image is required";
      isValid = false;
    }
  
    if (!isValid) return;
  
    // Prepare form data
    const formData = {
      title: title.value.trim(),
      categoryId: categoryId.value,
      price: parseFloat(price.value),
      description: description.value.trim(),
      imageFile: imageFile.value,
      imageUrl: imageUrl.value,
    };
  
    // Emit event
    if (props.isEdit) {
      emits("edit", { ...formData, id: props.initialData?._id });
    } else {
      emits("add", formData);
    }
  
    // Reset form and close
    resetForm();
    emits("close");
  };
  
  // Close modal
  const close = () => {
    resetForm();
    emits("close");
  };
  
  // Reset form
  const resetForm = () => {
    title.value = "";
    categoryId.value = "";
    price.value = "";
    description.value = "";
    imageUrl.value = "";
    imageFile.value = null;
    errors.value = {};
    if (fileInput.value) fileInput.value.value = ""; // Clear file input
  };
  </script>
  
  <style scoped>
  .text-destructive {
    color: #ef4444; /* Adjust based on your theme */
  }
  </style>