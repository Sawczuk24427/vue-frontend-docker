<script setup></script>

<template>
  <div class="d-flex justify-center pt-10">
    <v-card class="w-100 pa-5" variant="elevated" max-width="500" height="450" color="#fff">
      <v-stepper bg-color="white" :items="['Name', 'Email', 'Password']"></v-stepper>
    </v-card>
  </div>
</template>
