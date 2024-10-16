<template>
  <div class="container">
    <div class="header">
      <p>Get Weather</p>
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
      <h2>{{ weatherData.city }}, {{ weatherData.country }}</h2>
      <div>
        <!--The image source of of the weather icon will be coming from a function called iconUrl
                which will be shared in script later-->
        <img :src="iconUrl" alt="Weather Icon" />
        <p>{{ temperature }} °C</p>
      </div>
      <!-- weather[0] means the current weather, the way we need to obtain data depends on how
          the API JSON data looks-->
      <span>{{ weatherData.description }}</span>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const city = ref('')
const weatherData = ref(null)

const temperature = computed(() => {
  return weatherData.value ? Math.floor(weatherData.value.temperature - 273) : null
})

const iconUrl = computed(() => {
  return `http://api.openweathermap.org/img/w/${weatherData.value.icon}.png`
})

const fetchWeather = async (queryType, queryData) => {
  try {
    const body =
      queryType === 'location'
        ? JSON.stringify({ q: 'location', lat: queryData.lat, lon: queryData.lon })
        : JSON.stringify({ q: 'city', city: queryData.city })

    const response = await fetch('https://getweather-kk6pz4a3xa-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    const data = await response.json()

    weatherData.value = data.weather
  } catch (error) {
    console.error(error)
  }
}

const fetchCurrentLocationWeather = async () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        await fetchWeather('location', { lat: latitude, lon: longitude })
      },
      (error) => {
        console.error('Geolocation error:', error)
      }
    )
  } else {
    console.error('Geolocation is not supported by this browser.')
  }
}

const searchByCity = async () => {
  if (city.value) {
    await fetchWeather('city', { city: city.value })
  } else {
    console.error('City name is required.')
  }
}

onMounted(() => {
  fetchCurrentLocationWeather()
})
</script>

<style scoped></style>
