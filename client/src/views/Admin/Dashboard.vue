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
          <h6>Orders Per Time of Day</h6>
          <BarChart :data="orderData" />
        </div>
        <div class="chart-card">
          <h6>Revenue Over Time</h6>
          <LineChart :data="revenueData" />
        </div>
        <div class="chart-card">
          <h6>Orders by Category</h6>
          <PieChart :data="categoryOrderData" />
        </div>
      </div>
  
      <!-- Additional Metrics Section -->
      <div class="mb-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(metric, index) in additionalMetrics" :key="index" class="w-full">
          <div class="metric-card">
            <h5>{{ metric.title }}</h5>
            <p class="value">{{ metric.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import BarChart from "@/components/Charts/BarChart/BarChart.vue";
  import LineChart from "@/components/Charts/LineChart/LineChart.vue";
  import PieChart from "@/components/Charts/PieChart/PieChart.vue";
  
  export default {
    data() {
      return {
        metrics: [
          { title: "Total Orders", value: "1,234" },
          { title: "Total Revenue", value: "$56,789" },
          { title: "Active Customers", value: "125" },
          { title: "Orders Today", value: "43" },
          { title: "New Users", value: "7" },
          { title: "Average Order Value", value: "$45.78" },
          { title: "Items Sold", value: "3,450" },
          { title: "Returned Orders", value: "23" },
        ],
        additionalMetrics: [
          { title: "Pending Orders", value: "15" },
          { title: "Delivered Orders", value: "1,100" },
          { title: "Cancelled Orders", value: "15" },
          { title: "Top Selling Item", value: "Grilled Chicken" },
        ],
        
      };
    },
    components: {
      BarChart,
      LineChart,
      PieChart,
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
  
  @media (max-width: 768px) {
    .metric-card {
      margin-bottom: 20px;
    }
  }
  </style>
  