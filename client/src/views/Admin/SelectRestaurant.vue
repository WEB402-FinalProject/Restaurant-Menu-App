<template>
    <div class="select-restaurant">
      <h2>Select Your Restaurant</h2>
      <div v-if="restaurants.length === 0">
        <p>No restaurants available. Please contact the admin.</p>
      </div>
      <div v-else>
        <ul>
          <li v-for="restaurant in restaurants" :key="restaurant._id">
            <button @click="selectRestaurant(restaurant)">
              {{ restaurant.name }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import api from '../../services/api';
  
  export default {
    data() {
      return {
        restaurants: [],
      };
    },
    methods: {
      async fetchRestaurants() {
        try {
          // Fetch restaurants the logged-in user has access to
          const response = await api.get('/restaurants');
          this.restaurants = response.data;
        } catch (error) {
          console.error('Error fetching restaurants:', error);
        }
      },
      selectRestaurant(restaurant) {
        // Save selected restaurant ID to localStorage
        localStorage.setItem('selectedRestaurant', restaurant._id);
        
        // Redirect to the dashboard or the desired admin page
        this.$router.push('/admin/dashboard');
      }
    },
    mounted() {
      this.fetchRestaurants();
    }
  };
  </script>
  
  <style scoped>
  .select-restaurant {
    text-align: center;
    padding: 20px;
  }
  button {
    padding: 10px;
    margin: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    cursor: pointer;
  }
  