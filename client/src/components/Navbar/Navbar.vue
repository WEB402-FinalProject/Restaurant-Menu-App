<template>
  <div class="flex h-10 border px-10 py-1.5 justify-between">
    <div class="flex justify-start gap-10">
      <a href="">Home</a>
      <template v-for="category in categories" :key="category._id">
        <a :href="`/menu/${category._id}`">
          {{ category.name }}
        </a>
      </template>
    </div>
    <a href="">Cart</a>
  </div>
</template>

<script setup>
import categoryService from '@/services/categoryService/categoryService';
import { ref, onMounted } from 'vue';

const categories = ref([]);

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

<style lang="scss" scoped>
</style>
