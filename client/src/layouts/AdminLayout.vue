<script setup>
import AppSidebar from "@/components/AppSideBar/AppSidebar.vue";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
</script>

<template>
  <SidebarProvider>
    <AppSidebar />
    <main>
      <SidebarTrigger />
      <div class="centered-main-block">
        <RouterView />
      </div>
    </main>
  </SidebarProvider>
</template>

<style scoped>
.centered-main-block {
  display: block; /* Ensure it's treated as a block */
  width: 90%; /* Make sure it has a defined width (adjust as needed) */
  max-width: 1200px; /* Optional: maximum width */
  margin-left: auto;
  margin-right: auto; /* The magic for horizontal centering */
  /* Add other styles like padding, background, etc. */
}

/* It's good practice to ensure the body doesn't have unexpected margins */
body {
  margin: 0;
}
</style>
