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
  <div class="login-container">
    <h2>Sign In</h2>
    <form @submit.prevent="handleLogin" class="login-form">
      <div class="form-group">
        <label>Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" v-model="password" required />
      </div>

      <button type="submit" class="submit-btn">Log in</button>
    </form>

    <p v-if="errorMessage" class="error-message">
      {{ errorMessage }}
    </p>
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
