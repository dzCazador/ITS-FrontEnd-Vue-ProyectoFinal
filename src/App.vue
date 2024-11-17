<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import ThemeToggle from '@/components/ThemeToggle.vue'
import { useThemeStore } from '@/stores/ThemeStore'

const theme = useThemeStore()
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'dark' : ''"
    class="min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white"
  >
    <header class="p-4 bg-gray-200 dark:bg-gray-800">
      <ThemeToggle />
    </header>
    <RouterView />
  </div>
</template>

<style scoped></style>
