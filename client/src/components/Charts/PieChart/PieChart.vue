<template>
  <div>
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

export default {
  components: {
    Pie
  },
  data() {
    return {
      chartData: {
        labels: ['Appetizers', 'Main Course', 'Drinks'],
        datasets: [
          {
            data: [15000, 30000, 5000],
            backgroundColor: ['#FF5733', '#33FF57', '#3357FF']
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Revenue by Category'
          }
        }
      }
    };
  }
};
</script>
