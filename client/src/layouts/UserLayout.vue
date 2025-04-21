<template>
    <div>
      <Navbar />
      <div class="user-container">
        <router-view />
      </div>
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar/Navbar.vue'
  </script>
  