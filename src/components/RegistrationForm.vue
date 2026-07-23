<script setup>
import { ref, computed } from 'vue'

import axios from '@/axios'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['loginForm'])
const step = ref(1)

const { defineField, errors, validateField, validate } = useForm({
  validationSchema: yup.object({
    name: yup.string().required('Name cannot be empty'),
    email: yup.string().email('Invalid Email').required('Email cannot be empty'),
    password: yup.string().required('Password cannot be empty'),
    confirmPassword: yup
      .string()
      .required('Please confirm password')
      .oneOf([yup.ref('password')], 'Passwords do not match'),
  }),
})

const [name] = defineField('name')
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password] = defineField('password')
const [confirmPassword, confPassAttrs] = defineField('confirmPassword', {
  validateOnModelUpdate: false,
})

const stepFields = {
  1: ['name'],
  2: ['email'],
  3: ['password', 'confirmPassword'],
}

const validateStep = async () => {
  const fields = stepFields[step.value]
  const results = await Promise.all(fields.map((field) => validateField(field)))

  return results.every((result) => result.valid)
}

const handleNext = async () => {
  const isValid = await validateStep()
  if (!isValid) {
    return
  }
  if (step.value < 3) {
    step.value++
    return
  }
  const registered = await handleRegister()
  if (registered) {
    emit('loginForm', email.value)
  }
}

const handleRegister = async () => {
  try {
    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('/auth/register', {
      name: name.value,
      email: email.value,
      password: password.value,
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
          <div>
            <v-stepper-window-item :value="1"
              ><v-text-field
                v-model="name"
                :error-messages="errors.name"
                label="Username"
              ></v-text-field
            ></v-stepper-window-item>
            <v-stepper-window-item :value="2">
              <v-text-field
                v-model="email"
                v-bind="emailAttrs"
                :error-messages="errors.email"
                label="Email"
                type="email"
              ></v-text-field>
            </v-stepper-window-item>
            <v-stepper-window-item :value="3">
              <v-text-field
                v-model="password"
                :error-messages="errors.password"
                type="password"
                label="Password"
                autocomplete="off"
                class="pb-4"
              ></v-text-field>
              <v-text-field
                v-model="confirmPassword"
                v-bind="confPassAttrs"
                :error-messages="errors.confirmPassword"
                type="password"
                label="Confirm password"
                autocomplete="off"
              ></v-text-field>
            </v-stepper-window-item>
          </div>
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
