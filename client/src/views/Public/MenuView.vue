<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ restaurantName }}</h2>

    <div v-for="category in categories" :key="category._id" class="mb-6">
      <h3 class="text-xl font-semibold">{{ category.name }}</h3>
      <ul>
        <li v-for="item in category.items" :key="item._id" class="p-2 border-b">
          <div class="flex justify-between items-center">
            <span>{{ item.name }} - ${{ item.price }}</span>
            <button @click="addToCart(item)">Add</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="fixed bottom-0 left-0 right-0 bg-white shadow p-4">
      <button
        class="w-full bg-blue-600 text-white p-2 rounded"
        @click="placeOrder"
      >
        Place Order ({{ cart.length }} items)
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const restaurantId = route.params.restaurantId;
const tableNumber = route.params.tableNumber;

const restaurantName = ref("");
const categories = ref([]);
const cart = ref([]);

// Fetch categories and items on load
onMounted(async () => {
  const res = await fetch(`/api/public/restaurants/${restaurantId}/menus`);
  const data = await res.json();
  restaurantName.value = data.name;
  categories.value = data.categories;
});

function addToCart(item) {
  cart.value.push(item);
}

async function placeOrder() {
  const res = await fetch(
    `/api/public/restaurants/${restaurantId}/tables/${tableNumber}/orders`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart.value }),
    }
  );

  const result = await res.json();
  alert("Order placed successfully!");
  cart.value = [];
}
</script>
