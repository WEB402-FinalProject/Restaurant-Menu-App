<template>
    <div
      v-if="show"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="close"
    >
      <div class="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h3 class="text-xl font-semibold mb-4">Add Category</h3>
        <div class="mb-4">
          <label for="categoryTitle" class="block text-sm font-medium mb-1">Title</label>
          <input
            id="categoryTitle"
            v-model="categoryTitle"
            type="text"
            class="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-500"
          />
        </div>
        <div class="flex justify-end gap-2">
          <UiButton variant="outline" @click="close">Cancel</UiButton>
          <UiButton @click="submit">Add</UiButton>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Button as UiButton } from '@/components/ui/button'
  import categoryService from '@/services/categoryService/categoryService'
  
  const props = defineProps({
    show: Boolean,
  })
  
  const emits = defineEmits(['close', 'add'])
  
  const categoryTitle = ref('')
  
  async function submit() {
    const title = categoryTitle.value.trim()
    if (!title) return
  
    try {
      const response = await categoryService.createCategory({ name: title })
      console.log('Category created:', response)
      emits('add', title)
      categoryTitle.value = ''
    } catch (error) {
      console.error('Create category error:', error)
      alert('Something went wrong. Try again.')
    }
  }
  
  function close() {
    categoryTitle.value = ''
    emits('close')
  }
  </script>
  
  <style scoped lang="scss">
  /* Optional: Add animations or transitions */
  </style>
  