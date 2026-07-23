<script setup>
import { ref } from 'vue'
import axios from '@/axios'
import { useUserStore } from '@/stores/user'
import { useForm } from 'vee-validate'
import * as yup from 'yup'

const emit = defineEmits(['registerForm', 'dashboard'])
const props = defineProps({
  email: String,
})

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Field cannot be empty'),
  password: yup.string().required('Field cannot be empty'),
})

const { defineField, errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    email: props.email || '',
    password: '',
  },
})
const [email, emailAttrs] = defineField('email', { validateOnModelUpdate: false })
const [password] = defineField('password')
const errorMessage = ref('')
const userStore = useUserStore()

const onLogin = handleSubmit(async (values) => {
  try {
    errorMessage.value = ''

    await axios.get('/sanctum/csrf-cookie')

    const response = await axios.post('/auth/login', {
      email: email.value,
      password: password.value,
    })

    userStore.setUser(response.data.data)

    emit('dashboard')
  } catch (error) {
    errorMessage.value = 'Invalid email or password'
    console.error(error)
  }
})
</script>

<template>
  <div class="d-flex justify-center pt-10">
    <v-card class="w-100 pa-5" variant="elevated" max-width="500" height="450" color="#fff">
      <v-card-title class="text-headline-large font-weight-bold text-center pt-2 pb-5">
        Sign in</v-card-title
      >
      <v-form v-model="form" @submit.prevent="onLogin" class="display-flex">
        <v-text-field
          v-model="email"
          v-bind="emailAttrs"
          type="email"
          label="Email"
          density="compact"
          :error-messages="errors.email"
        ></v-text-field>
        <v-text-field
          v-model="password"
          type="password"
          label="Password"
          density="compact"
          :error-messages="errors.password"
        ></v-text-field>
        <p :class="{ invisible: !errorMessage }" class="text-error font-weight-bold mt-0 mb-12">
          {{ errorMessage || '\u00A0' }}
        </p>

        <v-btn type="submit" color="gray" class="mb-4 cursor: pointer w-100 font-weight-bold"
          >Log in</v-btn
        >
      </v-form>
      <v-divider class="border-opacity-75" :thickness="2"
        ><span class="font-weight-bold">Or</span></v-divider
      >
      <v-btn
        color="gray"
        class="mt-4 cursor: pointer w-100 font-weight-bold"
        @click="emit('registerForm')"
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
