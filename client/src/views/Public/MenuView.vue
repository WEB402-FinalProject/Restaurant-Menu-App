<template>
  <div class="p-4">
    <!-- Restaurant Name -->
    <h2 class="text-3xl font-bold mb-6 text-center">{{ restaurantName }}</h2>

    <!-- Filters -->
    <div class="flex w-full max-w-4xl mx-auto mb-6 gap-4">
      <input
        v-model="searchQuery"
        class="flex-grow p-3 border rounded-md"
        type="text"
        placeholder="Search Menu Items..."
      />
      <select v-model="selectedCategory" class="w-40 p-3 border rounded-md">
        <option value="">All Categories</option>
        <option
          v-for="category in categories"
          :key="category._id"
          :value="category._id"
        >
          {{ category.name }}
        </option>
      </select>
      <select v-model="sortOrder" class="w-40 p-3 border rounded-md">
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="title-asc">Title: A to Z</option>
        <option value="title-desc">Title: Z to A</option>
      </select>
    </div>

    <!-- Menu Categories -->
    <div
      v-for="category in filteredCategories"
      :key="category._id"
      class="mb-8"
    >
      <h3 class="text-2xl font-semibold mb-4">{{ category.name }}</h3>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 scrollable-menu"
      >
        <div
          v-for="item in filteredItems(category.items)"
          :key="item._id"
          class="flex flex-col bg-white border rounded-lg shadow hover:shadow-lg overflow-hidden"
        >
          <img
            v-if="item.image"
            :src="item.image"
            alt="Menu Item Image"
            class="w-full h-40 object-cover"
          />
          <div class="p-4 flex flex-col justify-between flex-grow">
            <div class="flex justify-between items-center mb-2">
              <span class="text-lg font-semibold">{{ item.title }}</span>
              <span class="text-gray-600">${{ item.price }}</span>
            </div>
            <p class="text-sm text-gray-500 mb-4">{{ item.description }}</p>
            <button
              class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              @click="addToCart(item)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Open Cart Button -->
    <button
      v-if="cart.length > 0"
      class="fixed bottom-6 right-6 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 z-50"
      @click="showCartModal = true"
    >
      🛒 View Cart ({{ totalItems }})
    </button>

    <!-- Cart Modal -->
    <div
      v-if="showCartModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div
        class="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg"
      >
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold">Your Cart</h3>
          <button
            @click="showCartModal = false"
            class="text-gray-500 hover:text-red-500 text-lg"
          >
            ✕
          </button>
        </div>

        <ul>
          <li
            v-for="(item, index) in cart"
            :key="item._id"
            class="flex justify-between items-center py-2 border-b"
          >
            <div>
              <span class="font-medium"
                >{{ item.title }} x {{ item.quantity }}</span
              >
              <p class="text-sm text-gray-500">${{ item.price }}</p>
            </div>
            <div class="flex items-center gap-2">
              <button @click="decreaseQuantity(item)" class="text-red-600 px-2">
                -
              </button>
              <button
                @click="increaseQuantity(item)"
                class="text-green-600 px-2"
              >
                +
              </button>
              <button
                @click="removeFromCart(index)"
                class="text-gray-500 hover:text-red-500"
              >
                ✕
              </button>
            </div>
          </li>
        </ul>

        <div class="flex justify-between mt-4 text-lg font-semibold">
          <span>Total:</span>
          <span>${{ totalPrice }}</span>
        </div>

        <button
          class="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          @click="confirmPlaceOrder"
        >
          Place Order
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/services/api";

const route = useRoute();
const restaurantId = route.params.restaurantId;
const tableNumber = route.params.tableNumber;

const restaurantName = ref("");
const categories = ref([]);
const searchQuery = ref("");
const selectedCategory = ref("");
const sortOrder = ref("price-asc");
const cart = ref([]);
const showCartModal = ref(false);

// Load restaurant and menu
onMounted(async () => {
  try {
    const res = await api.get(`/public/restaurant/${restaurantId}`);
    restaurantName.value = res.data.name;

    const menuRes = await api.get(`/public/restaurant/${restaurantId}/menu`);
    categories.value = menuRes.data;
  } catch (err) {
    console.error("Failed to load data:", err);
  }
});

// Cart logic
const addToCart = (item) => {
  const found = cart.value.find((i) => i._id === item._id);
  if (found) {
    found.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
};

const removeFromCart = (index) => {
  cart.value.splice(index, 1);
};

const increaseQuantity = (item) => {
  item.quantity++;
};

const decreaseQuantity = (item) => {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart.value = cart.value.filter((i) => i._id !== item._id);
  }
};

const totalPrice = computed(() =>
  cart.value
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
);

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
);

// Filtering
const filteredCategories = computed(() =>
  categories.value.filter((category) =>
    category.items.some((item) =>
      item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  )
);

const filteredItems = (items) => {
  let filtered = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );

  if (sortOrder.value === "price-asc")
    filtered.sort((a, b) => a.price - b.price);
  else if (sortOrder.value === "price-desc")
    filtered.sort((a, b) => b.price - a.price);
  else if (sortOrder.value === "title-asc")
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  else if (sortOrder.value === "title-desc")
    filtered.sort((a, b) => b.title.localeCompare(a.title));

  return filtered;
};

// Place order
const confirmPlaceOrder = async () => {
  try {
    const payload = {
      items: cart.value.map((item) => ({
        itemId: item._id,
        quantity: item.quantity,
      })),
    };

    await api.post(
      `/public/restaurant/${restaurantId}/table/${tableNumber}/orders`,
      payload
    );
    alert("Order placed successfully!");
    cart.value = [];
    showCartModal.value = false;
  } catch (err) {
    console.error("Order failed:", err);
    alert("Failed to place order.");
  }
};
</script>

<style scoped>
.scrollable-menu {
  max-height: calc(100vh - 300px);
  overflow-y: auto;
}
</style>
