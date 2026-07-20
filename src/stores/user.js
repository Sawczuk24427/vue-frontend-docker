import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const user = ref(null)

  function setUser(userData) {
    user.value = userData
  }

  function clearUser(userData) {
    user.value = null
  }

  return {
    user,
    setUser,
    clearUser,
  }
})
