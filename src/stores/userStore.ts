import { defineStore } from 'pinia'
import type { UserState } from '@/models/AuthModels'
import axios from '@/utils/axios'

//localImport
import type { User } from '@/models/AuthModels'

const baseUrl = `${import.meta.env.VITE_API_URL}/users`

export const useUserStore = defineStore({
  id: 'user',
  state: (): UserState => ({
    loading: false,
    users: null,
  }),
  actions: {
    async register(data: User) {
      await axios.post('/register', data)
    },
  },
})
