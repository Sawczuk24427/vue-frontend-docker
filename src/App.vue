<script setup>
import { ref } from 'vue'
import LoginForm from './components/Login.vue'
import RegistrationForm from './components/Registration.vue'

const currentView = ref('login')
</script>

<template>
  <v-app class="app-background">
    <v-main>
      <LoginForm v-if="currentView === 'login'" @register="currentView = 'register'" />
      <RegistrationForm v-if="currentView === 'register'"></RegistrationForm>
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
