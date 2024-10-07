<template>
  <div class="container pt-3">
    <div class="row">
      <div class="col-md-4 d-flex">
        <div class="panel d-flex align-items-center">
          <div class="panel-body text-center row d-flex align-items-between p-4">
            <div class="pv-lg">
              <i class="pi pi-user avatar" />
            </div>
            <h3 class="m0 text-bold">{{ userInfo.displayName }}</h3>
            <hr class="my-4 border border-dark" />
            <div class="mv-lg">
              <p>
                Hello, I'm a just a dummy contact in your contact list and this is my presentation
                text. Have fun!
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8 d-flex">
        <div class="panel p-4">
          <div class="panel-body">
            <div>
              <form @submit.prevent="handleUpdateProfile">
                <div class="form-floating mb-2">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Email Address"
                    v-model="userInfo.email"
                    disabled
                    readonly
                  />
                  <label for="email">Email Address</label>
                </div>

                <div class="form-floating mb-2">
                  <input
                    type="text"
                    class="form-control"
                    id="displayName"
                    placeholder="Display Name"
                    v-model="formData.displayName"
                  />
                  <label for="displayName">Display Name <span class="text-danger">*</span></label>
                </div>

                <div class="form-floating mb-2">
                  <input
                    type="number"
                    class="form-control"
                    id="age"
                    placeholder="Age"
                    v-model="formData.age"
                  />
                  <label for="age">Age</label>
                </div>

                <div class="form-floating mb-2">
                  <label v-if="formData.gender == '-1'" for="gender">Gender</label>
                  <select
                    id="gender"
                    class="form-select"
                    v-model="formData.gender"
                    aria-label="Gender"
                  >
                    <option value="-1" disabled selected hidden></option>
                    <option :value="GENDER_MALE">Male</option>
                    <option :value="GENDER_FEMALE">Female</option>
                    <option :value="GENDER_NOT_SPECIFIED">Prefer Not To Say</option>
                  </select>
                  <label v-if="formData.gender != '-1'" for="gender">Gender</label>
                </div>

                <div class="form-floating mb-3">
                  <input
                    id="country"
                    list="countries"
                    class="form-control"
                    placeholder="Country"
                    v-model="formData.country"
                  />
                  <datalist id="countries">
                    <option
                      v-for="country in allCountries"
                      :key="country.code"
                      :value="country.name"
                    >
                      {{ country.name }} ({{ country.code }})
                    </option>
                  </datalist>
                  <label for="country">Country</label>
                </div>

                <div class="col-1 mx-auto">
                  <button class="btn btn-primary" type="submit">Update</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getAuth } from 'firebase/auth'
import { useStore } from 'vuex'

import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import db from '@/firebase/init'

const GENDER_MALE = '1'
const GENDER_FEMALE = '2'
const GENDER_NOT_SPECIFIED = '0'

const store = useStore()

// Get all countries and their codes
countries.registerLocale(enLocale)
const allCountries = Object.entries(countries.getNames('en', { select: 'official' })).map(
  ([code, name]) => ({ code, name })
)

// User information
const currentUser = getAuth().currentUser
const userInfo = ref({
  email: '',
  displayName: '',
  age: '',
  gender: '-1',
  country: ''
})

// Form data
const formData = ref({
  displayName: '',
  age: '',
  gender: '-1',
  country: ''
})

const fetchUserData = async () => {
  try {
    const userSnapshot = await getDoc(doc(db, 'users', currentUser.uid))
    userInfo.value = userSnapshot.data()

    formData.value = {
      displayName: userInfo.value.displayName || '',
      age: userInfo.value.age || '',
      gender: userInfo.value.gender || '-1',
      country: userInfo.value.country || ''
    }
  } catch (error) {
    console.error('Error getting user data:', error.message)
  }
}

const errors = ref({
  displayName: null,
  age: null
})

const validateDisplayName = () => {
  if (formData.value.displayName === '') {
    errors.value.displayName = 'Display Name is required'
  } else {
    errors.value.displayName = null
  }
}

const validateAge = () => {
  if (formData.value.age < 0) {
    errors.value.age = 'Age must be a positive number'
  } else {
    errors.value.age = null
  }
}

const handleUpdateProfile = async () => {
  validateDisplayName()
  validateAge()

  if (!errors.value.displayName && !errors.value.age) {
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), {
        displayName: formData.value.displayName,
        age: formData.value.age,
        gender: formData.value.gender,
        country: formData.value.country
      })
      triggerToast(
        'success',
        'Update Profile Successfull',
        'You have successfully update your profile.',
        5000
      )
      fetchUserData()
    } catch (error) {
      console.log(error)
      triggerToast(
        'error',
        'Update Profile Failed',
        'There was an error updating your profile. Please try again later.',
        5000
      )
    }
  } else {
    if (errors.value.displayName) {
      triggerToast('error', 'Update Profile Failed', errors.value.displayName, 5000)
    }
    if (errors.value.age) {
      triggerToast('error', 'Update Profile Failed', errors.value.age, 5000)
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

onMounted(() => {
  fetchUserData()
})
</script>

<style scoped>
.panel {
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.14),
    0 2px 2px 0 rgba(0, 0, 0, 0.098),
    0 1px 5px 0 rgba(0, 0, 0, 0.084);
  border: 0;
  border-radius: 4px;
  margin-bottom: 16px;
  width: 100%;
}

.avatar {
  font-size: 90px;
  margin: 20px;
  border: solid 2px black;
  border-radius: 50%;
  background-color: white;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
