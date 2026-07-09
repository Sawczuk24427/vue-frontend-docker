<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegistrationForm from './components/RegistrationForm.vue'

const currentView = ref('loginForm')
</script>

<template>
  <v-app class="app-background">
    <v-main>
      <LoginForm v-if="currentView === 'loginForm'" @registerForm="currentView = 'registerForm'" />
      <RegistrationForm
        v-if="currentView === 'registerForm'"
        @loginForm="currentView = 'loginForm'"
      ></RegistrationForm>
    </v-main>
  </v-app>
</template>

<style scoped>
.app-background {
  background-image: url('/assets/background-blue.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
</style>
