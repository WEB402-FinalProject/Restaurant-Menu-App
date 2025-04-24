<template>
    <div class="p-6">
      <h2 class="text-3xl font-bold mb-6 text-gray-800">📋 All Orders</h2>
  
      <div v-if="loading" class="text-gray-600">Loading orders...</div>
      <div v-else-if="orders.length === 0" class="text-gray-500">No orders found.</div>
  
      <div v-else class="overflow-x-auto">
        <table class="w-full table-auto bg-white shadow-md rounded-xl text-sm">
          <thead class="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th class="px-4 py-3">Order ID</th>
              <th class="px-4 py-3">Table No</th>
              <th class="px-4 py-3">Items</th>
              <th class="px-4 py-3">Total</th>
              <th class="px-4 py-3">Status</th>
              <th class="px-4 py-3">Placed At</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order._id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-4 py-3 font-mono text-xs text-gray-700">{{ order._id.slice(-6).toUpperCase() }}</td>
              <td class="px-4 py-3 text-center font-semibold text-blue-700">
                {{ order.tableNumber || 'N/A' }}
              </td>
              <td class="px-4 py-3">
                <ul>
                  <li v-for="item in order.items" :key="item._id">
                    🍔 <strong>{{ item.itemId.title }}</strong> × {{ item.quantity }}
                    <span class="text-xs text-gray-500">(${{ item.itemId.price }})</span>
                  </li>
                </ul>
              </td>
              <td class="px-4 py-3 font-semibold text-green-700">
                ${{ getTotalPrice(order.items) }}
              </td>
              <td class="px-4 py-3">
                <span
                  :class="[
                    'px-2 py-1 rounded-full text-xs font-semibold',
                    statusClass(order.status)
                  ]"
                >
                  {{ order.status }}
                </span>
              </td>
              <td class="px-4 py-3 text-gray-500">
                {{ formatDate(order.createdAt) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import api from "@/services/api";
  
  const orders = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const restaurantId = localStorage.getItem("selectedRestaurant");
      const res = await api.get(`/public/restaurant/${restaurantId}/orders`);
      orders.value = res.data;
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    } finally {
      loading.value = false;
    }
  });
  
  const getTotalPrice = (items) =>
    items.reduce((sum, item) => sum + item.itemId.price * item.quantity, 0).toFixed(2);
  
  const formatDate = (date) => new Date(date).toLocaleString();
  
  const statusClass = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "in-progress":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };
  </script>
  