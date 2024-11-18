<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import Footer from '@/components/Footer.vue' 
import { useThemeStore } from '@/stores/ThemeStore'
import dark from '@/assets/dark-mode.jpg'
import light from '@/assets/light-mode.jpg'

const theme = useThemeStore()
</script>

<template>
  <div
    v-bind:class="theme.isDark ? 'dark' : ''"
    :style="{
      backgroundImage: theme.isDark 
        ? `url(${dark})` 
        : `url(${light})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
    class="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-black dark:text-white"
  >
    <!-- Header -->
    <header class="p-4 bg-gray-200 dark:bg-gray-800">
      <ThemeToggle />
    </header>

    <!-- Main Content -->
    <main class="flex-grow px-4">
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 dark:bg-gray-800 text-center py-4 mt-auto">
      <Footer />
    </footer>
  </div>
</template>

<style scoped>
html, body {
  height: 100%;
  margin: 0;
}

footer {
  margin-top: auto; /* Esto asegura que el footer se empuje al final */
}
</style>

