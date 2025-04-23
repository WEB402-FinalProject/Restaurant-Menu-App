<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h3>Add New Menu</h3>
        <input v-model="newMenu.name" placeholder="Menu Name" />
        <button @click="handleAdd">Add</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const props = defineProps({
    show: Boolean
  })
  
  const newMenu = ref({
    name: ''
  })
  
  const emit = defineEmits(['add', 'close'])
  
  function handleAdd() {
    emit('add', { name: newMenu.value.name })
    newMenu.value.name = ''
  }
  </script>
  
  <style scoped>
  </style>
  