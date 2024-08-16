<template>
  <!-- <div class="form">
    <h1>User Information Form / Credentials</h1>
    <form>
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" /><br />

      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br />

      <label for="isAustralian">Australian Resident?</label><br />
      <input type="checkbox" id="isAustralian" name="isAustralian" /><br />

      <label for="reason">Reason For Joining:</label><br />
      <textarea id="reason" name="reason" rows="3"></textarea><br />

      <label for="gender">Gender</label><br />
      <select id="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Other</option>
      </select>
    </form>
  </div> -->

  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <!-- Username -->
            <div class="col-md-6 col-sm-6 col-lg-8 col-xl-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <!-- Age -->
            <div class="col-md-6 col-sm-6 col-lg-8 col-xl-6">
              <label for="age" class="form-label">Age</label>
              <input
                type="number"
                class="form-control"
                id="age"
                @blur="() => validateAge(true)"
                @input="() => validateAge(false)"
                v-model="formData.age"
              />
              <div v-if="errors.age" class="text-danger">{{ errors.age }}</div>
            </div>
          </div>
          <div class="row mb-3">
            <!-- Password -->
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>

            <!-- Confirm Password -->
            <div class="col-md-6 col-sm-6 col-lg-4 col-xl-6">
              <label for="confirmPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirmPassword"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <!-- isAustralian -->
            <div class="col-md-6 col-sm-6 col-xl-12 col-xxl-8" style="align-self: center">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
              </div>
            </div>
            <!-- Gender -->
            <div class="col-md-6 col-sm-6 col-xl-12 col-xxl-4">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="() => validateGender(true)"
                @change="() => validateGender(true)"
                v-model="formData.gender"
              >
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger">{{ errors.gender }}</div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason For Joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              v-model="formData.reason"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- <div class="row mt-5" v-if="submittedCards.length">
          <div class="d-flex justify-content-start">
            <div
              v-for="(card, index) in submittedCards"
              :key="index"
              class="card m-2"
              style="width: 18rem"
            >
              <div class="card-header">User Information</div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Username: {{ card.username }}</li>
                <li class="list-group-item">Password: {{ card.password }}</li>
                <li class="list-group-item">
                  Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                </li>
                <li class="list-group-item">Gender: {{ card.gender }}</li>
                <li class="list-group-item">Reason: {{ card.reason }}</li>
              </ul>
            </div>
          </div>
        </div> -->
      </div>
    </div>
    <div class="row mt-5" v-if="submittedCards.length">
      <DataTable :value="submittedCards" tableStyle="min-width: 50rem">
        <Column
          v-for="col of columns"
          :key="col.field"
          :field="col.field"
          :header="col.header"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
// Our logic will go here
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  age: '',
  password: '',
  confirmPassword: '',
  isAustralian: false,
  reason: '',
  gender: ''
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validateAge(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateGender(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.age &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    if (formData.value.reason === '') {
      formData.value.reason = 'None'
    }
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const columns = [
  { field: 'username', header: 'Username' },
  { field: 'age', header: 'Age' },
  { field: 'password', header: 'Password' },
  { field: 'confirmPassword', header: 'Confirm Password' },
  { field: 'isAustralian', header: 'Australian Resident' },
  { field: 'gender', header: 'Gender' },
  { field: 'reason', header: 'Reason' }
]

const clearForm = () => {
  formData.value = {
    username: '',
    age: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: ''
  }

  errors.value = {
    username: null,
    age: null,
    password: null,
    confirmPassword: null,
    isAustralian: null,
    reason: null,
    gender: null
  }
}

const errors = ref({
  username: null,
  age: null,
  password: null,
  confirmPassword: null,
  isAustralian: null,
  reason: null,
  gender: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validateAge = (blur) => {
  if (formData.value.age === '') {
    if (blur) errors.value.age = 'Please enter your age'
  } else if (formData.value.age < 0 || formData.value.age > 130) {
    if (blur) errors.value.age = 'Age must be between 0 and 130'
  } else {
    errors.value.age = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  errors.value.password = null

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.confirmPassword === '') {
    if (blur) errors.value.confirmPassword = 'Please confirm your password'
  } else if (formData.value.confirmPassword !== formData.value.password) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateGender = (blur) => {
  if (formData.value.gender === '') {
    if (blur) errors.value.gender = 'Please select your gender'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length > 200) {
    if (blur) errors.value.reason = 'Reason cannot exceed 200 characters long'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
/* Our logic will go here */
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
