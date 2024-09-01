<template>
  <div class="container">
    <div class="row">
      <div class="col-md-4 d-flex align-items-stretch">
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
      <div class="col-md-8 d-flex align-items-stretch">
        <div class="panel p-4">
          <div class="panel-body">
            <div>
              <form @submit.prevent="handleUpdateProfit">
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
                  <label for="displayName">Display Name</label>
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
                  <select
                    id="gender"
                    class="form-select"
                    aria-label="Gender"
                    v-model="formData.gender"
                  >
                    <option disabled value="-1" hidden>Gender</option>
                    <option value="1">Male</option>
                    <option value="2">Female</option>
                    <option value="0">Perfer Not To Say</option>
                  </select>
                  <label for="gender">Gender</label>
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
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'

import countries from 'i18n-iso-countries'
import enLocale from 'i18n-iso-countries/langs/en.json'

// Get all countries and their codes
countries.registerLocale(enLocale)
const allCountries = Object.entries(countries.getNames('en', { select: 'official' })).map(
  ([code, name]) => ({ code, name })
)

// Handle user information
const store = useStore()
const userInfo = computed(() => store.state.user)

const formData = ref({
  displayName: userInfo.value.displayName,
  age: userInfo.value.age,
  gender: userInfo.value.gender ? userInfo.value.gender : '-1',
  country: userInfo.value.country
})

const errors = ref({
  displayName: null,
  password: null
})

const validateDisplayName = () => {
  if (formData.value.displayName === '') {
    errors.value.displayName = 'Display Name is required'
  } else {
    errors.value.displayName = null
  }
}

const handleUpdateProfit = () => {
  validateDisplayName()
  if (!errors.value.displayName) {
    const userData = JSON.parse(localStorage.getItem('userData') || '[]')

    userData.forEach((user) => {
      if (user.email === userInfo.value.email) {
        Object.assign(user, formData.value)
        store.dispatch('updateUser', user)
      }
    })

    localStorage.setItem('userData', JSON.stringify(userData))

    alert('Profile updated successfully')
  } else {
    alert('Enter invalid data.')
  }
}
</script>

<style scoped>
body {
  margin-top: 20px;
  background: #f5f7fa;
}

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
