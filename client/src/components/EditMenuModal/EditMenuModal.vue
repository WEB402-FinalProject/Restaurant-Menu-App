<template>
    <div v-if="show" class="modal">
      <div class="modal-content">
        <h3>Edit Menu</h3>
        <input v-model="menu.name" placeholder="Menu Name" />
        <button @click="handleUpdate">Update</button>
        <button @click="$emit('close')">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watchEffect } from 'vue'
  
  const props = defineProps({
    show: Boolean,
    menu: Object
  })
  
  const emit = defineEmits(['update', 'close'])
  
  const menu = ref({ ...props.menu })
  
  watchEffect(() => {
    menu.value = { ...props.menu }
  })
  
  function handleUpdate() {
    emit('update', menu.value)
  }
  </script>
  
  <style scoped>
  </style>
  