<template>
  <div class="main-content">
    <div class="d-none d-lg-flex justify-content-between align-items-center p-4 pb-3 border-bottom">
      <h2>Dashboard</h2>
      <!-- <div class="btn-toolbar mb-2 mb-md-0">
        <button
          type="button"
          class="btn btn-sm btn-outline-secondary dropdown-toggle d-flex align-items-center gap-1"
        >
          <i class="pi pi-calendar" />
          This week
        </button>
      </div> -->
    </div>

    <div class="d-flex justify-content-center my-3">
      <button
        id="showMap"
        class="btn btn-outline-primary"
        @click="showMap"
        :disabled="currentView === 'map'"
      >
        Map View
      </button>

      <button
        id="showAgeDistribution"
        class="btn btn-outline-secondary ms-3"
        @click="showPieChart"
        :disabled="currentView === 'chart'"
      >
        Age Distribution
      </button>
    </div>

    <div v-if="currentView === 'map'" class="map-container">
      <MapChart :data="mapData" />
    </div>

    <div v-if="currentView === 'chart'" class="chart-container">
      <Chart type="doughnut" :data="chartData" />
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { MapChart } from 'vue3-map-chart'
import 'vue3-map-chart/dist/style.css'
import Chart from 'primevue/chart'

const error = ref(null)

const currentView = ref('map')
const mapData = ref(null)
const chartData = ref(null)
const chartOptions = ref(null)

const showMap = () => {
  currentView.value = 'map'
}

const showPieChart = () => {
  currentView.value = 'chart'
}

const processChartData = (data) => {
  const labels = Object.keys(data)
  const values = Object.values(data)

  console.log('The Labels is ', labels)

  return {
    labels: labels,
    datasets: [
      {
        data: values,
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'].map(
          (color) => {
            return `${color}80`
          }
        )
      }
    ]
  }
}

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement)
  const textColor = documentStyle.getPropertyValue('--p-text-color')

  return {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '60%',
    plugins: {
      legend: {
        labels: {
          color: textColor
        }
      }
    }
  }
}

const fetchAllUserData = async () => {
  try {
    const response = await axios.get('https://getuserstats-mo2s3enq2q-uc.a.run.app')
    const data = response.data

    mapData.value = data.countries
    chartData.value = processChartData(data.ageDistribution)
    chartOptions.value = setChartOptions()

    console.log(chartData.value)

    error.value = null
  } catch (error) {
    console.error('Error fetching data:', error)
    error.value = error
  }
}

onMounted(() => {
  fetchAllUserData()
})
</script>

<style scoped>
.main-content {
  margin-left: 300px;
}

.chart-container {
  width: 400px;
  height: 300px;
  margin: 0 auto;
}
</style>
