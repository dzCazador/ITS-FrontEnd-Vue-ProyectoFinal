<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
import { useAuthStore } from '@/stores/authStore'

const theme = useThemeStore()
const auth = reactive(useAuthStore())

const repeatPwd = ref('')
const reactiveCredentials = reactive({
  email: '',
  password: '',
})

async function register() {
  if (repeatPwd.value === reactiveCredentials.password) {
    await auth.registerUser(reactiveCredentials)
  } else {
    alert('Las passwords no coinciden')
  }
}
</script>

<template>
  <div :class="{ dark: theme.isDark }" class="flex flex-col items-center h-screen">
    <div class="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Register</h2>
      <form class="flex flex-col" @submit.prevent="register()">
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
        <input
          v-model="repeatPwd"
          placeholder="Repetir Password"
          class="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
        />
        <button
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition duration-150"
          type="submit"
        >
          Registrate
        </button>
      </form>
    </div>
  </div>
</template>

