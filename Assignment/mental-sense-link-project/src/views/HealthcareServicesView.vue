<template>
  <div class="container mt-2">
    <div class="row">
      <div class="col-md-6">
        <p class="text-start mb-4">
          Use the search button below to quickly find the nearest psychiatric hospital. The table
          will display the hospital's name, phone number, and distance. When you click on the target
          hospital, you will be able to see detailed directions.
        </p>
        <div ref="mapContainer" class="map-container"></div>
      </div>
      <div class="col-md-6">
        <DataTable
          v-model:selection="selectedHospital"
          :value="hospitals"
          selectionMode="single"
          dataKey="coordinates"
          :metaKeySelection="true"
        >
          <Column field="name" header="Name"></Column>
          <Column field="address" header="Address"></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_MAP_ACCESS_TOKEN
const mapboxgl_sessionToken = import.meta.env.VITE_MAPBOX_MAP_SEESION_TOKEN

const hospitals = ref([])
const selectedHospital = ref(null)
const userMarker = ref([])

const map = ref(null)
const mapContainer = ref(null)
const userCoordinates = ref(null)

onMounted(() => {
  map.value = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [145.1326887, -37.9138403],
    zoom: 12
  })

  map.value.on('load', () => {
    map.value.addSource('user-location', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: userCoordinates
            },
            properties: {
              title: 'Your Location'
            }
          }
        ]
      }
    })

    map.value.addLayer({
      id: 'user-marker',
      type: 'circle',
      source: 'user-location',
      paint: {
        'circle-radius': 10,
        'circle-color': 'red'
      }
    })

    map.value.on('move', () => {
      const lngLat = [userCoordinates.value[0], userCoordinates.value[1]]
      map.value.getSource('user-location').setData({
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: lngLat
            }
          }
        ]
      })
    })

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          userCoordinates.value = [position.coords.longitude, position.coords.latitude]
          map.value.setCenter(userCoordinates.value)

          searchHospitals(userCoordinates.value)
        },
        (error) => {
          console.error('Unable to retrieve location:', error)
          const defaultCoordinates = [145.1326887, -37.9138403]
          map.value.setCenter(defaultCoordinates)

          searchHospitals(defaultCoordinates)
        }
      )
    } else {
      console.error('Geolocation is not supported by this browser')
      const defaultCoordinates = [145.1326887, -37.9138403]
      map.value.setCenter(defaultCoordinates)
      searchHospitals(defaultCoordinates)
    }
  })
})

const searchHospitals = async (coordinates) => {
  const query = 'clinic,hospital'
  const apiUrl = `https://api.mapbox.com/search/searchbox/v1/suggest?q=${query}&types=poi&limit=7&proximity=${coordinates[0]},${coordinates[1]}&access_token=${mapboxgl.accessToken}&session_token=${mapboxgl_sessionToken}`

  try {
    const response = await fetch(apiUrl)
    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()

    for (const suggestion of data.suggestions) {
      const retrieveData = await retrieveHospital(suggestion.mapbox_id)
      if (retrieveData) {
        hospitals.value.push({
          coordinates: retrieveData.coordinates,
          name: retrieveData.name,
          address: retrieveData.address
        })
      }
    }

    data.suggestions.forEach(async (suggestion) => {
      const retrieveData = await retrieveHospital(suggestion.mapbox_id)
      if (retrieveData) {
        const hospitalMarker = new mapboxgl.Marker()
          .setLngLat(retrieveData.coordinates)
          .setPopup(new mapboxgl.Popup().setText(retrieveData.name))
          .addTo(map.value)

        hospitalMarker.getElement().addEventListener('click', () => {
          selectedHospital.value = retrieveData
        })
      }
    })
  } catch (error) {
    console.error('Error fetching hospitals:', error)
  }
}

const retrieveHospital = async (id) => {
  const retrieveUrl = `https://api.mapbox.com/search/searchbox/v1/retrieve/${id}?session_token=${mapboxgl_sessionToken}&access_token=${mapboxgl.accessToken}`

  try {
    const response = await fetch(retrieveUrl)
    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    return {
      coordinates: data.features[0].geometry.coordinates,
      name: data.features[0].properties.name,
      address: data.features[0].properties.full_address
    }
  } catch (error) {
    console.error('Error retrieving hospital: ', error)
    return null
  }
}

const getRoute = async (startCoordinates, endCoordinates) => {
  const directionsApiUrl = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoordinates[0]},${startCoordinates[1]};${endCoordinates[0]},${endCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`

  try {
    const response = await fetch(directionsApiUrl)
    if (!response.ok) throw new Error('Network response was not ok')

    const data = await response.json()
    const route = data.routes[0].geometry.coordinates

    if (map.value.getSource('route')) {
      map.value.removeLayer('route')
      map.value.removeSource('route')
    }

    map.value.addSource('route', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      }
    })

    map.value.addLayer({
      id: 'route',
      type: 'line',
      source: 'route',
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': '#888',
        'line-width': 8
      }
    })

    const bounds = route.reduce(
      (bounds, coord) => {
        return bounds.extend(coord)
      },
      new mapboxgl.LngLatBounds(route[0], route[0])
    )

    map.value.fitBounds(bounds, {
      padding: 30
    })
  } catch (error) {
    console.error('Error fetching route:', error)
  }
}

watch(selectedHospital, (newValue) => {
  if (Array.isArray(userMarker.value)) {
    userMarker.value.forEach((marker) => marker.remove())
  }

  userMarker.value = []

  if (newValue && newValue.coordinates) {
    const selectedHospitalCoordinates = newValue.coordinates
    const hospitalMarker = new mapboxgl.Marker({ color: 'green' })
      .setLngLat(selectedHospitalCoordinates)
      .addTo(map.value)

    userMarker.value.push(hospitalMarker)
    getRoute(userCoordinates.value, selectedHospitalCoordinates)
  } else {
    console.warn('Selected hospital is undefined or does not have coordinates.')
  }
})
</script>

<style scoped>
.emergency-info {
  text-align: center;
  padding: 20px;
}

.contact-info {
  text-align: center;
  padding: 20px;
}

.map-container {
  height: 500px;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}
</style>
