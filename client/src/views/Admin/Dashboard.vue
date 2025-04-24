<template>
  <div class="dashboard px-4 py-6 w-full">
    <!-- Overview Section -->
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div v-for="(metric, index) in metrics" :key="index" class="w-full">
        <div class="metric-card">
          <h5>{{ metric.title }}</h5>
          <p class="value">{{ metric.value }}</p>
        </div>
      </div>
    </div>

    <!-- Orders and Operations -->
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="chart-card">
        <h6>Hourly Sales</h6>
        <BarChart :data="hourlySalesData" />
      </div>
      <div class="chart-card">
        <h6>Weekly Sales</h6>
        <LineChart :data="weeklySalesData" />
      </div>
      <div class="chart-card">
        <h6>Orders Per Time of Day</h6>
        <BarChart :data="ordersPerTimeData" />
      </div>
    </div>

    <!-- Additional Metrics Section -->
    <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div
        v-for="(metric, index) in additionalMetrics"
        :key="index"
        class="w-full"
      >
        <div class="metric-card">
          <h5>{{ metric.title }}</h5>
          <p class="value">{{ metric.value }}</p>
        </div>
      </div>
    </div>

    <!-- Comparison Section -->
    <div
      class="mb-4 grid grid-cols-1 lg:grid-cols-2 gap-4"
      v-if="comparison.totalOrders"
    >
      <div class="comparison-card">
        <h6>Comparison (Today vs Yesterday)</h6>
        <div class="comparison-details">
          <p>
            <strong>Total Orders:</strong> Today:
            {{ comparison.totalOrders.today }} / Yesterday:
            {{ comparison.totalOrders.yesterday }}
          </p>
          <p>
            <strong>Total Revenue:</strong> Today:
            {{ comparison.totalRevenue.today }} / Yesterday:
            {{ comparison.totalRevenue.yesterday }}
          </p>
          <p>
            <strong>Total Items Sold:</strong> Today:
            {{ comparison.totalItemsSold.today }} / Yesterday:
            {{ comparison.totalItemsSold.yesterday }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

// Register the required components in Chart.js
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  PointElement,
  LineElement,
  CategoryScale,
  LinearScale
);

import api from "@/services/api"; // Import the API service
import BarChart from "@/components/Charts/BarChart/BarChart.vue";
import LineChart from "@/components/Charts/LineChart/LineChart.vue";

export default {
  data() {
    return {
      metrics: [],
      additionalMetrics: [],
      comparison: {},
      hourlySalesData: [],
      weeklySalesData: [],
      ordersPerTimeData: [], // Add this if you're showing orders per time
    };
  },
  components: {
    BarChart,
    LineChart,
  },
  created() {
    const restaurantId = localStorage.getItem("selectedRestaurant");

    // Check if the restaurantId exists in localStorage
    if (restaurantId) {
      // Make API call with the dynamic restaurantId
      api
        .get(`/dashboard/${restaurantId}`)
        .then((response) => {
          const data = response.data;

          // Setting metrics data
          this.metrics = data.metrics.map((metric) => ({
            title: metric.title,
            value: metric.value,
          }));

          // Setting additional metrics
          this.additionalMetrics = data.additionalMetrics.map((metric) => ({
            title: metric.title,
            value: metric.value,
          }));

          // Setting comparison data
          this.comparison = data.comparison || {};

          // Setting hourly sales data for the Bar chart
          this.hourlySalesData = data.hourlySales.map((hour) => ({
            label: `Hour ${hour._id}`, // Can replace with real hour if needed
            value: hour.totalRevenue,
          }));

          // Setting weekly sales data for the Line chart
          this.weeklySalesData = data.weeklySales.map((week) => ({
            label: week._id,
            value: week.totalRevenue,
          }));

          // Example: Orders per time of day (can adjust according to your data)
          this.ordersPerTimeData = data.hourlySales.map((hour) => ({
            label: `Hour ${hour._id}`,
            value: hour.totalRevenue, // Replace with the correct data for orders per time of day
          }));
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
        });
    } else {
      console.error("No restaurant selected");
    }
  },
};
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.metric-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s;
}

.metric-card:hover {
  transform: translateY(-5px);
}

.metric-card h5 {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.metric-card .value {
  font-size: 2rem;
  font-weight: bold;
  color: #4caf50;
}

.chart-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.chart-card h6 {
  font-size: 1.25rem;
  margin-bottom: 15px;
}

.comparison-card {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.comparison-card h6 {
  font-size: 1.25rem;
  margin-bottom: 15px;
}

.comparison-details p {
  font-size: 1rem;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .metric-card {
    margin-bottom: 20px;
  }
}
</style>
