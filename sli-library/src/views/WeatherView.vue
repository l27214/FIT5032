<template>
  <div class="container">
    <div class="header">
      <p1>Get Weather</p1>
      <div class="search-bar">
        <input type="text" v-model="city" placeholder="Enter city name" class="search-input" />
        <button @click="searchByCity">Search</button>
      </div>
    </div>
  </div>

  <main>
    <!--If there are no data returned, then skip rendering the information-->
    <div v-if="weatherData">
      <!--Display the weather data attribute returned from API -->
      <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
      <div>
        <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
      <span>{{ weatherData.weather[0].description }}</span>
    </div>
  </main>
</template>

<script setup>
import axios from 'axios'
import { ref, computed, onMounted } from 'vue'

const city = ref('')
const weatherData = ref(null)
// const hourlyForecast = ref([])
// const dailyForecast = ref([])

const apikey = import.meta.env.VITE_OPENWEATHER_API_KEY

const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.main.temp - 273) : null
})

const iconUrl = computed(() => {
  return weatherData.value
    ? `http://api.openweathermap.org/img/w/${weatherData.value.weather[0].icon}.png`
    : null
})

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
      await fetchWeatherData(url)
    })
  }
}

const fetchWeatherData = async (url) => {
  try {
    const response = await axios.get(url)
    weatherData.value = response.data
  } catch (error) {
    console.error('Error fetching weather data:', error)
  }
}

const searchByCity = async () => {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apikey}`
  await fetchWeatherData(url)
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped></style>
