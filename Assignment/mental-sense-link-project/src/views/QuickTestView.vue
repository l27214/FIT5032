<template>
  <div class="container">
    <div>
      <div class="mb-2">
        <Breadcrumb :model="breadcrumbItems" />
      </div>

      <div class="test-container">
        <h1 class="mb-4">Mental Health Quick Test</h1>

        <p>
          This quick test is designed to help you better understand your recent emotional and
          psychological state.
        </p>
        <p>
          We hope to provide you with a self-assessment tool to help you focus on your mental
          health.
        </p>
        <p>
          This quick test is designed to assess your emotional and psychological well-being over the
          <strong><em>past week</em></strong
          >. Please answer based on your feelings during that period.
        </p>
        <p>
          This test is completely <strong>anonymous</strong>, all answers will not be recorded or
          storedand your privacy will not be exposed.
        </p>

        <hr class="mb-3" />
        <form @submit.prevent="submitTest">
          <div v-for="(question, index) in questions" :key="index" class="mb-5">
            <!-- Question -->
            <h5>{{ index + 1 }}. {{ question.text }} <span class="text-danger">*</span></h5>

            <!-- Binary Question -->
            <div v-if="question.isBinary">
              <div class="d-flex align-items-center justify-content-start gap-2 mt-4">
                <RadioButton
                  v-model="responses[index]"
                  :inputId="`option${index}-yes`"
                  :value="'Yes'"
                />
                <label class="me-2">{{ question.options[0].answer }}</label>
              </div>
              <div class="d-flex align-items-center justify-content-start gap-2 mt-2">
                <RadioButton
                  v-model="responses[index]"
                  :inputId="`option${index}-no`"
                  :value="'No'"
                />
                <label class="me-2">{{ question.options[1].answer }}</label>
              </div>
            </div>

            <!-- Likert Scale Question -->
            <div v-else>
              <div class="d-flex align-items-end justify-content-center gap-2 mt-4">
                <div class="d-flex col-3 align-items-center justify-content-end">
                  <label>{{ question.options[0].answer }}</label>
                </div>

                <div
                  class="d-flex flex-column align-items-center justify-content-center gap-1"
                  v-for="n in 5"
                  :key="n"
                >
                  <div class="d-flex align-items-center justify-content-center mx-3">{{ n }}</div>
                  <div class="d-flex align-items-center justify-content-center mx-3">
                    <RadioButton
                      :inputId="`option${index}-${n}`"
                      v-model="responses[index]"
                      :value="question.options[n - 1].answer"
                    />
                  </div>
                </div>

                <div class="d-flex col-3 align-items-start justify-content-start">
                  <label>{{ question.options[4].answer }}</label>
                </div>
              </div>
            </div>
          </div>

          <hr class="mb-5" />

          <div class="d-flex justify-content-center mb-3">
            <Button
              label="Submit"
              aria-label="Submit"
              severity="secondary"
              raised
              @click="submitTest"
            />
          </div>
        </form>
      </div>
    </div>

    <Dialog
      header="Thank You for Participating"
      :visible="dialogVisible"
      :modal="true"
      @update:visible="closeDialog"
      class="p-2 m-3"
    >
      <div class="d-flex flex-column align-items-start justify-content-center">
        <div class="d-flex flex-column align-items-start justify-content-buttom my-3 pb-5">
          <span> Thank you for participating in our mental health test. </span>
          <span> You can choose to download your analysis report.</span>Or enter your email address
          to receive the results.<span> </span>
        </div>
        <div class="d-flex align-items-center justify-content-between w-100">
          <h5>Download the test results:</h5>
          <Button label="Download PDF" severity="primary" raised @click="downloadResultPdf" />
        </div>

        <h5 class="d-block text-center w-100 my-3">Or</h5>

        <h5 class="my-3">Enter your email address to receive the results</h5>
        <div class="d-flex align-items-center justify-content-between w-100">
          <InputText
            v-model="email"
            placeholder="Enter your email"
            type="email"
            class="flex-grow-1"
          />
          <Button
            label="Send to Email"
            severity="contrast"
            raised
            @click="sendResultToEmail"
            class="ms-5"
          />
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Breadcrumb from 'primevue/breadcrumb'
import Dialog from 'primevue/dialog'
import RadioButton from 'primevue/radiobutton'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const breadcrumbItems = [
  { label: 'Home', command: () => router.push('/') },
  { label: 'Mental Health Quick Test', command: () => router.push('/quicktest') }
]

const questions = [
  {
    text: 'Have you had enough energy to manage your daily activities recently?',
    options: [
      { answer: 'Yes', points: 1 },
      { answer: 'No', points: 0 }
    ],
    isBinary: true
  },
  {
    text: 'Do you often feel that the stress in your life is more than you can handle?',
    options: [
      { answer: 'Yes', points: 0 },
      { answer: 'No', points: 1 }
    ],
    isBinary: true
  },
  {
    text: 'Do you often find yourself worrying about things or the future?',
    options: [
      { answer: 'Yes', points: 0 },
      { answer: 'No', points: 1 }
    ],
    isBinary: true
  },
  {
    text: 'Have you had trouble falling asleep or waking up frequently lately?',
    options: [
      { answer: 'Yes', points: 0 },
      { answer: 'No', points: 1 }
    ],
    isBinary: true
  },
  {
    text: 'Have you been feeling lonely or had difficulty connecting with others recently?',
    options: [
      { answer: 'Yes', points: 0 },
      { answer: 'No', points: 1 }
    ],
    isBinary: true
  },
  {
    text: 'Do you follow a regular routine and maintain healthy eating habits?',
    options: [
      { answer: 'Yes', points: 1 },
      { answer: 'No', points: 0 }
    ],
    isBinary: true
  },
  {
    text: 'Have you participated in any activities that support your mental health, like exercise, meditation, or hobbies?',
    options: [
      { answer: 'Yes', points: 2 },
      { answer: 'No', points: 1 }
    ],
    isBinary: true
  },
  {
    text: 'How would you rate your overall emotional state in the past week?',
    options: [
      { answer: 'Very poor', points: 1 },
      { answer: 'Poor', points: 2 },
      { answer: 'Average', points: 3 },
      { answer: 'Good', points: 4 },
      { answer: 'Very good', points: 5 }
    ],
    isBinary: false
  }
]

const responses = ref(Array(questions.length).fill(null))
const dialogVisible = ref(false)
const requestBody = ref(null)
const pdfBlob = ref(null)
const email = ref('')

const closeDialog = () => {
  dialogVisible.value = false
  requestBody.value = null
  pdfBlob.value = null
  email.value = ''
}

const submitTest = async () => {
  if (responses.value.includes(null)) {
    alert('Please answer all questions before submitting.')
  } else {
    const totalPoints = questions.reduce((sum, question, index) => {
      const response = responses.value[index]

      const selectedOption = question.options.find((option) => option.answer === response)
      return sum + (selectedOption ? selectedOption.points : 0)
    }, 0)

    const submissionData = questions.map((question, index) => ({
      index: index + 1,
      questionText: question.text,
      response: responses.value[index]
    }))

    requestBody.value = {
      submitData: submissionData,
      totalPoints: totalPoints
    }

    dialogVisible.value = true
  }
}

const fetchTestResults = async () => {
  try {
    const response = await fetch('https://calculatetestresults-mo2s3enq2q-uc.a.run.app', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody.value)
    })

    if (response.ok) {
      pdfBlob.value = await response.blob()
    } else {
      console.error(response.statusText)
      triggerToast('danger', 'Failed to Generate Results', 'Please try again later.', 5000)
    }
  } catch (error) {
    console.error(error)
    triggerToast(
      'danger',
      'Failed to Generate Results',
      'Request Failed, please check your network connection.',
      5000
    )
  }
}

const downloadResultPdf = async () => {
  triggerToast('info', 'Downloading...', 'Your PDF test results are being downloaded.', 5000)

  if (!pdfBlob.value) {
    await fetchTestResults()

    if (!pdfBlob.value) {
      console.error('Failed to fetch PDF results for download.')
      triggerToast(
        'danger',
        'Email Sending Failed',
        'Failed to fetch test results. Please try again.',
        5000
      )
      return
    }
  }

  const pdfResultUrl = window.URL.createObjectURL(pdfBlob.value)

  const currentDate = new Date().toLocaleDateString()
  const fileName = `Mental-Sense-Link_Test_${currentDate}.pdf`
  const a = document.createElement('a')
  a.href = pdfResultUrl
  a.download = fileName
  document.body.appendChild(a)
  a.click()
  a.remove()

  window.URL.revokeObjectURL(pdfResultUrl)
}

const sendResultToEmail = async () => {
  if (!pdfBlob.value) {
    await fetchTestResults()

    if (!pdfBlob.value) {
      console.error('Failed to fetch PDF results for email.')
      triggerToast(
        'danger',
        'Email Sending Failed',
        'Failed to fetch test results. Please try again.',
        5000
      )
      return
    }
  }

  const reader = new FileReader()
  reader.readAsDataURL(pdfBlob.value)
  reader.onloadend = async () => {
    const base64data = reader.result.split(',')[1]
    try {
      const response = await fetch('https://sendemailfromsendgrid-mo2s3enq2q-uc.a.run.app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email.value,
          subject: 'Mental Sense Link Quick Test Result',
          message: `
              Hi,

              Please find your test result attached as PDF.

              Regards,

              Mental Sense Link Team`,
          pdfBase64: base64data
        })
      })
      console.log('trigger2')
      if (response.ok) {
        triggerToast(
          'success',
          'Email Sent Successfully',
          'Your test results have been sent to your email.',
          5000
        )
        email.value = ''
      } else {
        const errorText = await response.text()
        triggerToast('danger', 'Email Sending Failed', `Error: ${errorText}`, 5000)
      }
    } catch (error) {
      triggerToast('danger', 'Email Sending Failed', `Error: ${error.message}`, 5000)
    }
  }
}

const triggerToast = (severity, summary, detail, life) => {
  store.dispatch('setTriggerToast', {
    severity: severity,
    summary: summary,
    detail: detail,
    life: life
  })
}
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  margin-bottom: 3em;
}

.test-container {
  background-color: #e6e6fa;
  padding: 1rem 4rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
