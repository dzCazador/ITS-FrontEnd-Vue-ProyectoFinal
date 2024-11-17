<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { apiInstance } from '@/services/apiInstance'
import { useAuthStore } from '@/stores/authStore'
import type { Credentials, Session } from '@/models/CredentialsModel'

const theme = useThemeStore()

const useAuth = useAuthStore()
const auth = reactive(useAuth)

const repeatPwd: string = ''
const passwordRepeat = ref(repeatPwd)

const reactiveCredentials = reactive<CredentialsModel>({
  email: '',
  password: '',
})

async function register() {
  if (passwordRepeat.value === reactiveCredentials.password) {
    await auth.registerUser(reactiveCredentials)
  } else {
    alert('Las passwords no coinciden')
  }
}
</script>
<template>
  <div v-bind:class="theme.isDark ? 'dark' : ''" class="flex flex-col items-center h-screen">
    <div
      :class="theme.isDark ? 'bg-gray-800' : 'bg-gray-300'"
      class="w-full max-w-md rounded-lg shadow-md p-6"
    >
      <h2 :class="theme.isDark ? 'text-gray-200' : ''" class="text-2xl font-bold mb-4">
        Registrarse
      </h2>
      <form class="flex flex-col" @submit.prevent="register()">
        <input
          v-model="reactiveCredentials.email"
          placeholder="Email"
          :class="
            theme.isDark
              ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          "
          class="border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="email"
        />
        <input
          v-model="reactiveCredentials.password"
          :class="
            theme.isDark
              ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          "
          placeholder="Password"
          class="border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="password"
        />
        <input
          v-model="passwordRepeat"
          :class="
            theme.isDark
              ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
              : 'bg-gray-50 border-gray-300 text-gray-900'
          "
          placeholder="Repetir Password"
          class="border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
          type="password"
        />
        <button
          class="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
          type="submit"
        >
          Registrarse
        </button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
