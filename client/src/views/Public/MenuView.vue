<template>
  <div>
    <h2 class="text-2xl font-bold mb-4">{{ restaurantName }}</h2>

    <!-- Menu List -->
    <div v-for="category in categories" :key="category._id" class="mb-6">
      <h3 class="text-xl font-semibold">{{ category.name }}</h3>
      <ul>
        <li v-for="item in category.items" :key="item._id" class="p-2 border-b">
          <div class="flex justify-between items-center">
            <span>{{ item.title }} - ${{ item.price }}</span>
            <button
              class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              @click="addToCart(item)"
            >
              Add
            </button>
          </div>
        </li>
      </ul>
    </div>

    <!-- Cart Section -->
    <div
      v-if="cart.length > 0"
      class="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 space-y-2"
    >
      <h4 class="text-lg font-bold">Cart</h4>

      <div class="max-h-40 overflow-y-auto">
        <ul>
          <li
            v-for="(item, index) in cart"
            :key="item._id"
            class="flex justify-between items-center py-1"
          >
            <div>
              {{ item.title }} x {{ item.quantity }}
              <span class="text-gray-500">(${{ item.price }})</span>
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
      </div>

      <div class="flex justify-between font-semibold mt-2">
        <span>Total</span>
        <span>${{ totalPrice }}</span>
      </div>

      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 mt-2 rounded"
        @click="placeOrder"
      >
        Place Order ({{ totalItems }} items)
      </button>
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
const cart = ref([]);

// Fetch restaurant and menu
onMounted(async () => {
  try {
    const restaurantRes = await api.get(`/public/restaurant/${restaurantId}`);
    restaurantName.value = restaurantRes.data.name;

    const menuRes = await api.get(`/public/restaurant/${restaurantId}/menu`);
    categories.value = menuRes.data;
  } catch (error) {
    console.error("Error loading restaurant or menu:", error);
  }
});

// Add item to cart
function addToCart(item) {
  const existing = cart.value.find((i) => i._id === item._id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
}

// Remove item from cart
function removeFromCart(index) {
  cart.value.splice(index, 1);
}

// Increase/Decrease quantity
function increaseQuantity(item) {
  item.quantity++;
}

function decreaseQuantity(item) {
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    cart.value = cart.value.filter((i) => i._id !== item._id);
  }
}

// Total price and item count
const totalPrice = computed(() =>
  cart.value
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)
);

const totalItems = computed(() =>
  cart.value.reduce((sum, item) => sum + item.quantity, 0)
);

// Place order
// Place order function in frontend
async function placeOrder() {
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
  } catch (error) {
    console.error("Order failed:", error);
    alert("Failed to place order.");
  }
}

</script>
