<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { apiInstance } from '@/services/apiInstance'
import { useAuthStore } from '@/stores/authStore'
import type { Credentials, Session } from '@/models/CredentialsModel'

const theme = useThemeStore()

const useAuth = useAuthStore()
const auth = reactive(useAuth)

const reactiveCredentials = reactive<CredentialsModel>({
  email: '',
  password: '',
})

auth.changeCsrfToken()
async function login() {
  await auth.login(reactiveCredentials).then(console.log(auth.error))
}
</script>
<template>
  <div v-bind:class="theme.isDark ? 'dark' : ''" class="flex flex-col items-center h-screen">
    <div class="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-200 mb-4">Login</h2>
      <form class="flex flex-col" @submit.prevent="login()">
        <input
          v-model="reactiveCredentials.email"
          placeholder="Email"
          class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="email"
        />
        <input
          v-model="reactiveCredentials.password"
          placeholder="Password"
          class="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="password"
        />
        <div class="flex items-center justify-between flex-wrap">
          <p class="text-white mt-4">
            No posee cuenta?
            <a class="text-sm text-blue-500 -200 hover:underline mt-4" href="#">Registrarse</a>
          </p>
        </div>
        <button
          class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
