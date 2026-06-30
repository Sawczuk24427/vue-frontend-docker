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
  <div>
    <h2>Sign In</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div style="margin-top: 10px">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" style="margin-top: 15px">Log in</button>
    </form>

    <p v-if="errorMessage" style="color: red; margin-top: 20px">
      {{ errorMessage }}
    </p>
  </div>
</template>
