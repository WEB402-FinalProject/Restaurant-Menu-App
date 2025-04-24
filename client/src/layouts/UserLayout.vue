<template>
    <div>
      <!-- <Navbar /> -->
      <div class="user-container">
        <router-view />
      </div>
      <!-- <Footer /> -->
    </div>
  </template>
  
  <script setup>
  import Navbar from '@/components/Navbar/Navbar.vue'
  import Footer from '@/components/Footer/Footer.vue'

  </script>
  