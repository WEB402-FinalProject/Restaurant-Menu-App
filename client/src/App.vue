<script setup>
import { ref, onMounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const message = ref('Loading...')

onMounted(() => {
  fetch('http://localhost:3000/api/hello')
    .then(res => res.json())
    .then(data => {
      message.value = data.message
    })
    .catch(err => {
      console.error('Fetch error:', err)
      message.value = 'Failed to load message'
    })
})
</script>

<template>
  <div>
    <nav>
      <router-link to="/sign-in">Home</router-link> |
      <router-link to="/sign-up">About</router-link>
    </nav>
    <router-view /> <!-- This is where the page content will be shown -->
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
