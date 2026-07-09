<script setup>
import { ref } from 'vue'

defineEmits(['loginForm'])

const step = ref(1)
</script>

<template>
  <div class="d-flex justify-center pt-10">
    <v-card
      class="w-100 d-flex flex-column pa-5 pb-2"
      variant="elevated"
      max-width="500"
      height="450"
      color="#fff"
    >
      <div class="d-flex">
        <h1 class="ma-0">Create account</h1>
        <v-spacer />

        <v-btn icon flat color="white" class="opacity-60" @click="$emit('loginForm')"
          ><span class="font-weight-bold text-headline-small">X</span></v-btn
        >
      </div>

      <v-stepper v-model="step" flat bg-color="white" class="h-100 w-100 d-flex flex-column">
        <v-stepper-header>
          <v-stepper-item :value="1" title="Name" />
          <v-divider></v-divider>
          <v-stepper-item :value="2" title="Email" />
          <v-divider></v-divider>
          <v-stepper-item :value="3" title="Password" />
        </v-stepper-header>
        <v-stepper-window class="flex-grow-1">
          <v-stepper-window-item :value="1"><h2>ppp</h2></v-stepper-window-item>
          <v-stepper-window-item :value="2"></v-stepper-window-item>
          <v-stepper-window-item :value="3"></v-stepper-window-item>
        </v-stepper-window>
        <v-stepper-actions class="mt-auto" @click:next="step++" @click:prev="step--">
        </v-stepper-actions>
      </v-stepper>
    </v-card>
  </div>
</template>
