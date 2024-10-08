<template>
  <div class="faq_area pt-3 px-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-9 col-lg-6 my-3">
        <!-- Section Heading-->
        <div class="section_heading text-center">
          <h2>FAQ</h2>
          <h5>Get the support and information you need</h5>
        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <!-- FAQ Area-->
      <div class="col-12 col-sm-10 col-lg-8">
        <div class="accordion faq-accordian" id="faqAccordion">
          <div class="card border-0" v-for="(item, index) in faqs" :key="index">
            <div class="card-header" :id="'heading' + index">
              <h6
                class="mb-0 collapsed"
                data-bs-toggle="collapse"
                :data-bs-target="'#collapse' + index"
                aria-expanded="true"
                :aria-controls="'collapse' + index"
                @click="toggleFaq(index)"
              >
                {{ item.question }}
                <i :class="faqStatus[index] ? 'pi pi-minus' : 'pi pi-plus'" />
              </h6>
            </div>
            <div
              class="collapse"
              :id="'collapse' + index"
              :aria-labelledby="'heading' + index"
              data-parent="#faqAccordion"
            >
              <div class="card-body">
                <p>{{ item.answers[0] }}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- Support Button-->
        <div class="d-flex align-items-center justify-content-center text-center py-3">
          <p class="mb-0 px-2">Can't find your answers?</p>
          <router-link to="/about">Contact us</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const faqs = ref([
  {
    question: 'What is the purpose of this website?',
    answers: [
      'This website is designed to provide mental health support and resources to help users better cope with mental health challenges.'
    ]
  },
  {
    question: 'Who can use this website?',
    answers: [
      'The website is intended for anyone facing mental health challenges, as well as family members, educators, and professionals who wish to provide support.'
    ]
  },
  {
    question: 'What are the main features of this website?',
    answers: [
      'Our website offers a variety of features, including resource access, community support, and interactive communication, to meet the diverse needs of users.'
    ]
  },
  {
    question: 'How is my privacy and personal information protected?',
    answers: [
      'We strictly adhere to data protection policies, and all user information is encrypted to ensure privacy and security.'
    ]
  },
  {
    question: 'How can I participate in community discussions or share my experiences?',
    answers: [
      'Users can participate in forum discussions or share personal experiences by registering an account, encouraging mutual support.'
    ]
  },
  {
    question: 'What should I do if I encounter issues while using the website?',
    answers: [
      'If you encounter any issues, you can visit our help center or contact customer support, and we will provide assistance as soon as possible.'
    ]
  }
])

const faqStatus = ref(faqs.value.map(() => false))

const toggleFaq = (index) => {
  faqStatus.value[index] = !faqStatus.value[index]
}
</script>

<style scoped>
.faq_area {
  background-color: #f6f6ff;
}

.faq-accordian .card {
  margin-bottom: 1rem;
}

.faq-accordian .card .card-header {
  background-color: #ffffff;
  padding: 0;
  border-bottom-color: #ebebeb;
}

.faq-accordian .card .card-header h6 {
  cursor: pointer;
  padding: 1.75rem 2rem;
  color: #3f43fd;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.faq-accordian .card .card-header h6.collapsed {
  color: #070a57;
}

.faq-accordian .card .card-body {
  padding: 1.75rem 2rem;
}
</style>
