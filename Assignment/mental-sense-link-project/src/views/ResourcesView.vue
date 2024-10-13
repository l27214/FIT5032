<template>
  <div class="container">
    <div class="d-flex justify-content-center align-items-center pb-3">
      <SelectButton
        v-model="selectedOption"
        :options="options"
        optionLabel="name"
        :allow-empty="false"
      />
    </div>

    <!-- Article Content -->
    <div v-if="selectedOption?.value == 1">
      <div class="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
        <div class="col-lg-6 px-0">
          <h1 class="display-4 fst-italic">Mental Sense Link: Psychological Resources</h1>
          <p class="lead my-3">
            Access a curated selection of psychological resources designed to help you manage
            stress, overcome cyberbullying, and deal with depression.
          </p>
          <p class="lead mb-0">
            <a href="#" class="text-body-emphasis fw-bold">Browse resources...</a>
          </p>
        </div>
      </div>

      <div class="row mb-2">
        <div class="col-md-6">
          <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-primary-emphasis">Stress Management</strong>
              <h3 class="mb-0">Guided Relaxation Techniques</h3>
              <div class="mb-1 text-body-secondary">August 31</div>
              <p class="card-text mb-auto">
                Explore various relaxation techniques that can help you manage and reduce stress
                effectively.
              </p>
              <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                Continue reading
                <i class="pi pi-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div class="col p-4 d-flex flex-column position-static">
              <strong class="d-inline-block mb-2 text-success-emphasis"
                >Mindfulness Practices</strong
              >
              <h3 class="mb-0">Building Emotional Resilience</h3>
              <div class="mb-1 text-body-secondary">August 30</div>
              <p class="mb-auto">
                Learn how to cultivate mindfulness and emotional resilience to improve your overall
                well-being.
              </p>
              <a href="#" class="icon-link gap-1 icon-link-hover stretched-link">
                Continue reading
                <i class="pi pi-angle-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Video Content -->
    <div v-if="selectedOption?.value == 2">
      <div class="row mb-2">
        <div class="col-md-6" v-for="(video, index) in videoList" :key="index">
          <div
            class="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative"
          >
            <div class="col p-4 d-flex flex-column position-static">
              <div class="video-container">
                <video controls>
                  <source :src="video.url" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="selectedOption?.value == 3">
      <HealthcareServicesView />
    </div>
  </div>
</template>

<script setup>
import SelectButton from 'primevue/selectbutton'
import { onMounted, ref } from 'vue'
import HealthcareServicesView from './HealthcareServicesView.vue'
import db from '@/firebase/init'
import { collection, getDocs } from 'firebase/firestore'

const options = ref([
  { name: 'Article Content', value: 1 },
  { name: 'Video Content', value: 2 },
  { name: 'Healthcare Services', value: 3 }
])
const selectedOption = ref(options.value[0])

const videoList = ref([])

onMounted(async () => {
  const querySnapshot = await getDocs(collection(db, 'contents'))

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    if (data.type === 'video') {
      videoList.value.push({
        url: data.link
      })
    }
  })
})
</script>

<style scoped>
h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
}

@media (min-width: 768px) {
  .h-md-250 {
    height: 260px;
  }
}

.video-container {
  position: relative;
  padding-bottom: 50%;
  height: 0;
  overflow: hidden;
  background-color: white;
}

video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: auto;
  height: 100%;
  transform: translate(-50%, -50%);
}
</style>
