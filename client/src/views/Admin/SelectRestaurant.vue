<template>
  <div class="p-6 w-[70vw]">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Select Your Restaurant</h2>
      <UiButton class="flex items-center gap-2" @click="createRestaurant">
        <CirclePlus class="w-4 h-4" /> Add New Restaurant
      </UiButton>
    </div>

    <div v-if="restaurants.length === 0">
      <p>No restaurants available. Please create one.</p>
    </div>

    <div v-else>
      <div class="overflow-x-auto">
        <UiTable class="w-full">
          <TableHeader>
            <TableRow>
              <TableHead class="w-[100px]">Name</TableHead>
              <TableHead class="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow v-for="restaurant in restaurants" :key="restaurant._id">
              <TableCell class="font-medium">
                {{ restaurant.name }}
              </TableCell>
              <TableCell class="text-right">
                <div class="flex justify-end gap-2">
                  <UiButton
                    variant="outline"
                    size="sm"
                    @click="selectRestaurant(restaurant)"
                  >
                    Select
                  </UiButton>
                  <UiButton
                    variant="outline"
                    size="sm"
                    @click="openEditModal(restaurant)"
                  >
                    Edit
                  </UiButton>
                  <UiButton
                    variant="destructive"
                    size="sm"
                    @click="openDeleteDialog(restaurant._id)"
                  >
                    Delete
                  </UiButton>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </UiTable>
      </div>
    </div>

    <!-- Add Restaurant Modal -->
    <AddRestaurantModal
      :show="showModal"
      @close="showModal = false"
      @add="handleAddRestaurant"
    />

    <!-- Edit Restaurant Modal -->
    <AddRestaurantModal
      :show="showEditModal"
      :isEdit="true"
      :initialName="selectedRestaurant?.name"
      :restaurantId="selectedRestaurant?._id"
      @close="showEditModal = false"
      @edit="handleEditRestaurant"
    />

    <!-- Delete Confirmation Dialog -->
    <UiDialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <UiDialogContent>
        <UiDialogHeader>
          <UiDialogTitle>Confirm Deletion</UiDialogTitle>
          <UiDialogDescription>
            Are you sure you want to delete this restaurant? This action cannot
            be undone.
          </UiDialogDescription>
        </UiDialogHeader>
        <UiDialogFooter>
          <UiButton variant="outline" @click="showDeleteDialog = false">
            Cancel
          </UiButton>
          <UiButton variant="destructive" @click="confirmDeleteRestaurant">
            Delete
          </UiButton>
        </UiDialogFooter>
      </UiDialogContent>
    </UiDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { CirclePlus } from "lucide-vue-next";
import { createIcons, icons } from "lucide";
import { useRouter } from 'vue-router'; // Import useRouter from vue-router
createIcons({ icons });

// Initialize router
const router = useRouter();

// UI Components
import { Button as UiButton } from "@/components/ui/button";
import {
  Table as UiTable,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog as UiDialog,
  DialogContent as UiDialogContent,
  DialogHeader as UiDialogHeader,
  DialogTitle as UiDialogTitle,
  DialogDescription as UiDialogDescription,
  DialogFooter as UiDialogFooter,
} from "@/components/ui/dialog";

// Modal Component
import AddRestaurantModal from "@/components/AddRestaurantModal/AddRestaurantModal.vue";

// Service
import restaurantService from "@/services/restaurantService/restaurantService";

// State
const restaurants = ref([]);
const showModal = ref(false);
const showEditModal = ref(false);
const showDeleteDialog = ref(false);
const selectedRestaurant = ref(null);
const restaurantToDelete = ref(null);

// Add new restaurant handler
async function handleAddRestaurant(name) {
  try {
    const response = await restaurantService.createRestaurant({ name });
    restaurants.value.push(response.data);
    showModal.value = false;
  } catch (error) {
    console.error("Add restaurant error:", error);
    alert("Failed to add restaurant. Please try again.");
  }
}

// Edit restaurant handler
async function handleEditRestaurant(updatedName, restaurantId) {
  try {
    await restaurantService.updateRestaurant(restaurantId, { name: updatedName });
    const index = restaurants.value.findIndex((rest) => rest._id === restaurantId);
    if (index !== -1) {
      restaurants.value[index].name = updatedName;
    }
  } catch (error) {
    console.error("Update restaurant error:", error);
    alert("Failed to update restaurant. Please try again.");
  }
  selectedRestaurant.value = null;
  showEditModal.value = false;
}

// Open delete confirmation dialog
function openDeleteDialog(restaurantId) {
  restaurantToDelete.value = restaurantId;
  showDeleteDialog.value = true;
}

// Confirm delete restaurant
async function confirmDeleteRestaurant() {
  const restaurantId = restaurantToDelete.value;
  try {
    await restaurantService.deleteRestaurant(restaurantId);
    restaurants.value = restaurants.value.filter((rest) => rest._id !== restaurantId);
    showDeleteDialog.value = false;
    restaurantToDelete.value = null;
  } catch (error) {
    console.error("Delete restaurant error:", error);
    alert("Failed to delete restaurant. Please try again.");
  }
}

// Open edit modal
function openEditModal(restaurant) {
  selectedRestaurant.value = { ...restaurant };
  showEditModal.value = true;
}

// Fetch existing restaurants
onMounted(async () => {
  try {
    const response = await restaurantService.getRestaurants();
    if (Array.isArray(response.data)) {
      restaurants.value = response.data;
    } else {
      console.error("Expected array but got:", response.data);
    }
  } catch (error) {
    console.error("Fetch restaurants error:", error);
    alert("Something went wrong. Try again.");
  }
});

// Create new restaurant
function createRestaurant() {
  showModal.value = true; // Show the add restaurant modal
}

// Select a restaurant
function selectRestaurant(restaurant) {
  // You can perform any actions here such as storing the selected restaurant
  alert(`You selected: ${restaurant.name}`);
  // Save selected restaurant ID to localStorage
  localStorage.setItem('selectedRestaurant', restaurant._id);
  localStorage.setItem('selectedRestaurantName', restaurant.name);
  
  // Redirect to the dashboard or the desired admin page
  router.push('/admin/dashboard'); // Use router.push here
}
</script>

<style scoped>
.select-restaurant {
  text-align: center;
  padding: 20px;
}
button {
  padding: 10px;
  margin: 5px;
  background-color: #4caf50;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
