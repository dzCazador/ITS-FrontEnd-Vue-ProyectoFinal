<script setup lang="ts">
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/authStore'

const theme = useThemeStore()
const auth = reactive(useAuthStore())

const reactiveCredentials = reactive({
  email: '',
  password: '',
})

auth.changeCsrfToken()
async function login() {
  await auth.login(reactiveCredentials).then(console.log(auth.error))
}
</script>

<template>
  <div :class="{ dark: theme.isDark }" class="flex flex-col items-center h-screen">
    <div class="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Login</h2>
      <form class="flex flex-col" @submit.prevent="login()">
        <input
          v-model="reactiveCredentials.email"
          placeholder="Email"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
        />
        <input
          v-model="reactiveCredentials.password"
          placeholder="Password"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
        />
        <button
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>

