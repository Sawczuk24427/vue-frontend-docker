<script setup>
import { ref } from 'vue'
import axios from '@/axios'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    errorMessage.value = ''

    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('/login', {
      email: email.value,
      password: password.value,
    })
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Something went wrong'
    console.error(error)
  }
}
</script>

<template>
  <div class="d-flex justify-center">
    <v-card class="pa-20 w-100" variant="outlined" max-width="400">
      <v-card-title class="px-30 font-weight-bold"> Sign In</v-card-title>
      <v-form v-model="form" @submit.prevent="handleLogin" class="pa-5 display-flex ga-15">
        <v-text-field v-model="email" type="email" label="Email" density="compact"></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          density="compact"
        ></v-text-field>

        <v-btn type="submit" color="white" class="mt-10 pa-10 cursor: pointer">Log in</v-btn>
      </v-form>

      <p v-if="errorMessage" class="text-error mt-20 pa-5 font-weight-bold">
        {{ errorMessage }}
      </p>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  padding: 20px;
  margin: 0 auto;
  max-width: 400px;

  .login-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .form-group {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
      font-weight: bold;
    }
  }

  .submit-btn {
    margin-top: 10px;
    padding: 10px;
    cursor: pointer;
  }

  .error-message {
    color: red;
    margin-top: 20px;
    font-weight: bold;
  }
}
</style>
