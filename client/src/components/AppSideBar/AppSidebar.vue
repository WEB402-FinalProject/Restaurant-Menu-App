<script setup lang="ts">
import {
  Calendar,
  Home,
  Inbox,
  Search,
  Settings,
  LogOut,
} from "lucide-vue-next";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = async () => {
  try {
    await fetch("http://localhost:3000/api/auth/logout", {
      method: "GET",
      credentials: "include",
    });
    router.push("/sign-in"); // Redirect to login page after logout
  } catch (error) {
    console.error("Logout failed:", error);
  }
};

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Category",
    url: "/admin/category",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];
</script>

<template>
  <Sidebar class="h-screen flex flex-col">
    <SidebarContent class="flex flex-col flex-1">

      <!-- Scrollable Menu Area -->
      <div class="flex-1 overflow-y-auto">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                  <a :href="item.url">
                    <component :is="item.icon" />
                    <span>{{ item.title }}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </div>

      <!-- Logout Button at Bottom -->
      <div class="p-2 border-t border-gray-200 dark:border-gray-700">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <button
                @click="handleLogout"
                class="w-full text-left flex items-center gap-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <LogOut class="w-4 h-4" />
                <span>Logout</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </div>

    </SidebarContent>
  </Sidebar>
</template>
