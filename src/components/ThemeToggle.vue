<script setup>
import { reactive } from 'vue'
import { useThemeStore } from '@/stores/ThemeStore'
const theme = useThemeStore()
</script>

<template>
  <button
    @click="theme.toggleTheme"
    class="p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded"
  >
    {{ theme.mode === 'Dark Mode' ? 'Light Mode' : 'Dark Mode' }}
  </button>
</template>
