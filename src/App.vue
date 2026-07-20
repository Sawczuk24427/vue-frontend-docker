<script setup>
import { ref } from 'vue'
import LoginForm from './components/LoginForm.vue'
import RegistrationForm from './components/RegistrationForm.vue'
import Dashboard from './components/Dashboard.vue'

const currentView = ref('loginForm')
const transitionDirection = ref('slide-left')
const email = ref('')

function showRegister() {
  currentView.value = 'registerForm'
  transitionDirection.value = 'slide-left'
}

function showLogin(registeredEmail) {
  email.value = registeredEmail
  currentView.value = 'loginForm'
  transitionDirection.value = 'slide-right'
}
</script>

<template>
  <v-app class="app-background">
    <v-main>
      <Transition :name="transitionDirection" mode="out-in">
        <LoginForm
          v-if="currentView === 'loginForm'"
          @registerForm="showRegister"
          @dashboard="currentView = 'dashboard'"
          :email="email"
        />
        <RegistrationForm v-else-if="currentView === 'registerForm'" @loginForm="showLogin" />
        <Dashboard v-else-if="currentView === 'dashboard'" @loginForm="showLogin" />
      </Transition>
    </v-main>
  </v-app>
</template>

<style scoped lang="scss">
.app-background {
  background-image: url('/assets/background-blue.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}
.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.3s ease;
}

.slide-left-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.3s ease;
}

.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.slide-right-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
