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
  <div class="d-flex justify-center pt-10">
    <v-card class="w-100 pa-5" variant="outlined" max-width="500" height="450">
      <v-card-title class="text-headline-large font-weight-bold text-center pt-2 pb-5">
        Sign in</v-card-title
      >
      <v-form v-model="form" @submit.prevent="handleLogin" class="display-flex">
        <v-text-field v-model="email" type="email" label="Email" density="compact"></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          density="compact"
        ></v-text-field>
        <p :class="{ invisible: !errorMessage }" class="text-error font-weight-bold mt-0 mb-12">
          {{ errorMessage || '\u00A0' }}
        </p>

        <v-btn type="submit" color="white" class="mb-4 cursor: pointer w-100 font-weight-bold"
          >Log in</v-btn
        >
      </v-form>
      <v-divider class="border-opacity-75" :thickness="2"
        ><span class="font-weight-bold">Or</span></v-divider
      >
      <v-btn color="white" class="mt-4 cursor: pointer w-100 font-weight-bold"
        >Create an account</v-btn
      >
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.separator {
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #fff;
  line-height: 0.1em;
  margin: 10px 0 20px;
}

.separator span {
  background: #fff;
  padding: 0 10px;
}
</style>
