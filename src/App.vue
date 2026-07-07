<script setup>
import Login from './components/Login.vue'
</script>

<template>
  <v-app class="app-background">
    <Login />
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
