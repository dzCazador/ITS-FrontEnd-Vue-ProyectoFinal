import { defineStore } from 'pinia'
import router from '@/router'
import axios from '@/utils/axios'

//localImport
import type { User } from '@/models/AuthModels'
import { useSessionStore } from '@/stores/sessionStore'

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    auth: {} as {
      loading: boolean
      user: User | undefined | null
      refreshTokenTimeout: number | null
    },
  }),
  actions: {
    async login(username: string, password: string) {
      const response = await axios.post('/auth/login', {
        email: this.auth.user?.email,
        password: this.auth.user?.password,
      })
      localStorage.setItem('token', response.data.token)
      router.push('/')
      this.startRefreshTokenTimer()
    },
    async register(data: User) {
      await axios.post('/auth/signup', data)
    },
    async logout() {
      const response = await axios.post('/auth/logout')
      this.stopRefreshTokenTimer()
      this.auth.user = null
      router.push('/login')
    },
    async refreshToken() {
      //CORREGIR
      const response = await axios.get('/auth/csrf', {})
      localStorage.setItem('token', response.data.token)
      this.startRefreshTokenTimer()
    },
    startRefreshTokenTimer() {
      const sessionStore = useSessionStore()
      if (!this.auth.user || !this.auth.user?.jwtToken) return

      //to parse base64 json object
      const jwtBase64 = this.auth.user?.jwtToken.split('.')[1]
      const decodedJwtToken = JSON.parse(atob(jwtBase64))

      //Create a timeout to refresh the token before expires
      const expires = new Date(decodedJwtToken.exp * 1000)
      const timeout = expires.getTime() - Date.now() - 60 * 1000

      this.auth.refreshTokenTimeout = setTimeout(this.refreshToken, timeout)
      //Save de session vars in the session store
      sessionStore.update(jwtBase64, new Date(Date.now()), new Date(Date.now() + timeout), expires)
    },
    stopRefreshTokenTimer() {
      if (this.auth.refreshTokenTimeout) {
        clearTimeout(this.auth.refreshTokenTimeout)
        this.auth.refreshTokenTimeout = null
      }
    },
  },
})
