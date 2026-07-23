<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'
import axios from '@/axios'

const emit = defineEmits(['loginForm'])

const form = reactive({
  name: '',
  email: '',
  password: '',
  confPassword: '',
})

const error = reactive({
  name: '',
  email: '',
  password: '',
  confPassword: '',
})
const step = ref(1)
function validateField() {
  for (const key in error) {
    error[key] = ''
  }
  let isValid = true
  if (step.value === 1 && form.name.trim() === '') {
    error.name = 'Field cannot be empty'
    isValid = false
  } else if (step.value === 2) {
    if (form.email.trim() === '') {
      error.email = 'Field cannot be empty'
      isValid = false
    } else {
      const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      if (!re.test(form.email)) {
        error.email = 'Invalid email address'
        isValid = false
      }
    }
  } else if (step.value === 3) {
    if (form.password.trim() === '') {
      error.password = 'Field cannot be empty'
      isValid = false
    }

    if (form.password !== form.confPassword) {
      error.confPassword = 'Passwords do not match'
      isValid = false
    }
  }
  return isValid
}

const handleNext = async () => {
  if (!validateField()) {
    return
  }
  if (step.value < 3) {
    step.value++
    return
  } else if (step.value === 3) {
    const registered = await handleRegister()
    if (registered) {
      emit('loginForm', form.email)
    }
  }
}

const handleRegister = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('/auth/register', {
      name: form.name,
      email: form.email,
      password: form.password,
    })
    return response.data
  } catch (error) {
    if (error.response?.status === 422) {
      const errors = error.response.data.errors
      if (errors.name) {
        step.value = 1
        error.name = errors.name[0]
      } else if (errors.email) {
        step.value = 2
        error.email = errors.email[0]
      }
    } else {
      console.error(error)
    }
    return null
  }
}
</script>

<template>
  <div class="d-flex justify-center pt-10">
    <v-card
      class="w-100 d-flex flex-column pa-5 pb-2"
      variant="elevated"
      max-width="500"
      height="450"
      color="white"
    >
      <div class="d-flex">
        <h1 class="ma-0">Create account</h1>
        <v-spacer />

        <v-btn icon flat color="white" class="opacity-60" @click="$emit('loginForm')"
          ><span class="font-weight-bold text-headline-small">X</span></v-btn
        >
      </div>

      <v-stepper v-model="step" flat bg-color="white" class="h-100 w-100 d-flex flex-column">
        <v-stepper-header>
          <v-stepper-item :value="1" title="Name" />
          <v-divider />
          <v-stepper-item :value="2" title="Email" />
          <v-divider />
          <v-stepper-item :value="3" title="Password" />
        </v-stepper-header>
        <v-stepper-window class="flex-grow-1 pt-4">
          <v-form>
            <v-stepper-window-item :value="1"
              ><v-text-field
                v-model="form.name"
                :error-messages="error.name"
                label="Username"
              ></v-text-field
            ></v-stepper-window-item>
            <v-stepper-window-item :value="2">
              <v-text-field
                v-model="form.email"
                :error-messages="error.email"
                label="Email"
                type="email"
              ></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item :value="3">
              <v-text-field
                v-model="form.password"
                :error-messages="error.password"
                type="password"
                label="Password"
                autocomplete="off"
                class="pb-4"
              ></v-text-field>
              <v-text-field
                v-model="form.confPassword"
                :error-messages="error.confPassword"
                type="password"
                label="Confirm password"
                autocomplete="off"
              ></v-text-field>
            </v-stepper-window-item>
          </v-form>
        </v-stepper-window>
        <div class="d-flex justify-space-between pb-3">
          <v-btn @click="step--" v-if="step != 1" class="w-10 font-weight-bold">Back</v-btn>
          <v-spacer />
          <v-btn v-if="step < 3" @click="handleNext()" class="w-20 font-weight-bold">Next</v-btn>
          <v-btn v-else @click="handleNext()" color="success" class="w-10 font-weight-bold"
            >Create</v-btn
          >
        </div>
      </v-stepper>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
:deep(.v-messages__message) {
  font-size: 16px;
}
</style>
