<script setup>
import { useUserStore } from '@/stores/user'

const emit = defineEmits(['loginForm'])
const userStore = useUserStore()

function handleLogout() {
  userStore.clearUser()
  emit('loginForm')
}
</script>

<template>
  <div class="d-flex fill-height justify-center pa-10">
    <v-card class="d-flex flex-column w-100 pa-11 pt-4" variant="elevated" color="#fff">
      <div class="d-flex align-center">
        <h1 class="text-display-medium font-weight-bold">DASHBOARD</h1>
        <v-spacer />
        <v-icon icon="mdi-account" class="mr-3" size="x-large" />
        <h2 class="mr-5">{{ userStore.user.name }}</h2>
        <v-btn color="error" class="cursor: pointer font-weight-bold ml-4" @click="handleLogout()"
          ><v-icon icon="mdi-logout" start /> LOGOUT</v-btn
        >
      </div>
      <div class="flex-grow-1 d-flex align-center justify-center">
        <h2 class="text-headline-large font-italic pb-16">Content in progress...</h2>
      </div>
    </v-card>
  </div>
</template>
