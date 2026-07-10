<script setup>
import { ref } from 'vue'
import { reactive } from 'vue'

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

function handleNext() {
  if (!validateField()) {
    return
  }
  if (step.value < 3) {
    step.value++
    return
  } else if (step.value === 3) {
    handleRegister()
  }
}

function handleRegister() {
  emit('loginForm')
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
          <v-btn @click="step--" v-if="step != 1">Previous</v-btn>
          <v-spacer />
          <v-btn v-if="step < 3" @click="handleNext()">Next</v-btn>
          <v-btn v-else @click="handleNext()">Create</v-btn>
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
