import { defineStore } from 'pinia'
import router from '@/router'

//localImport
import { apiInstance } from '@/services/apiInstance'
import type { Credentials, SesionState } from '@/models/CredentialsModel'
import { Login, CreateUser, Logout } from '@/services/auth/AuthController'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): SesionState => ({
    loading: false,
    data: {
      user: undefined,
      csrfToken: undefined,
      jwtExpires: undefined,
    },
    error: '',
  }),
  actions: {
    changeCsrfToken() {
      const headers = apiInstance.defaults.headers // obtenemos los headers de nuestra instancia apiInstance
      this.data!.csrfToken = headers['csrf-token']?.toString() // pareaseamos a string el token y actualizamos el estado
      console.info('[SesionStore] CRSF Token Actualizado') // noficamos por consola
    },
    async login(credentials: Credentials) {
      this.loading = true
      try {
        const response = await Login(credentials)
        if (response.status === 200) {
          this.data!.user = credentials
          const currentEpochTime = Math.floor(Date.now() / 1000)
          this.data!.jwtExpires = currentEpochTime + 3 * 60
          this.loading = false
          this.startRefreshTokenTimer()
          router.push('/tasks')
        } else {
          // Si la respuesta no es 200, establecemos un error
          this.error = `Login failed with status: ${response.status}`
          this.loading = false
        }
      } catch (e) {
        this.error = e!.toString()
      }
    },
    async logout() {
      const response = await Logout()
      this.stopRefreshTokenTimer()
      this.data!.user = undefined
      router.push('/')
    },
    async registerUser(credentials: Credentials) {
      this.loading = true
      try {
        const response = await CreateUser(credentials)

        if (response.status === 201) {
          this.data!.user = credentials
          this.login(credentials)
          this.loading = false
        }
      } catch (e) {
        this.error = e!.toString()
      }
    },
    async refreshToken() {
      /* this.auth.user = await fetchWrapper.post(
        `${baseUrl}/refresh-token`,
        {},
        { credentials: 'include' },
      )
      this.startRefreshTokenTimer()*/
    },
    startRefreshTokenTimer() {
      /*
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
      */
    },
    stopRefreshTokenTimer() {
      /*if (this.auth.refreshTokenTimeout) {
        clearTimeout(this.auth.refreshTokenTimeout)
        this.auth.refreshTokenTimeout = null */
    },
  },
})
