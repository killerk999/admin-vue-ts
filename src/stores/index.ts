import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const globalData = ref({
    token: '',
  })

  const setToken = (userToken: string) => {
    globalData.value.token = userToken
    localStorage.setItem('token', userToken)
  }

  return { globalData, setToken }
})
