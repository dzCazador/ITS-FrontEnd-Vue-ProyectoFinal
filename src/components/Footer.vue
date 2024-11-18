<script setup>
import { useThemeStore } from '@/stores/ThemeStore'

const theme = useThemeStore()
</script>

<template>
  <footer
    :class="{ dark: theme.isDark }"
    class="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 py-6"
  >
    <div class="container mx-auto text-center">
      <p class="text-lg font-bold mb-2">
        Integrantes:
        <span class="text-orange-500">Cristian Testaseca</span> - 
        <span class="text-blue-500">Manuel Caporaso</span>
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        Frontend 2024 - Instituto Tecnico Superior
      </p>
      <div class="mt-4 flex justify-center space-x-4">
        <!-- GitHub Logo -->
        <a
          href="https://github.com/dzCazador/ITS-FrontEnd-Vue-ProyectoFinal" 
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-transform transform hover:scale-125"
          >
            <path
              d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.797 8.207 11.388.6.11.793-.261.793-.579v-2.091c-3.338.727-4.042-1.608-4.042-1.608-.544-1.38-1.33-1.749-1.33-1.749-1.088-.743.082-.727.082-.727 1.204.084 1.838 1.237 1.838 1.237 1.07 1.836 2.809 1.304 3.496.998.107-.776.418-1.304.762-1.604-2.664-.303-5.464-1.332-5.464-5.93 0-1.311.469-2.381 1.238-3.221-.125-.303-.537-1.527.115-3.187 0 0 1.006-.322 3.3 1.229.96-.267 1.988-.399 3.003-.404 1.014.005 2.042.137 3.003.404 2.292-1.551 3.298-1.229 3.298-1.229.653 1.66.241 2.884.116 3.187.769.84 1.238 1.91 1.238 3.221 0 4.605-2.804 5.623-5.47 5.923.43.374.815 1.11.815 2.237v3.309c0 .319.187.694.796.579 4.77-1.59 8.208-6.086 8.208-11.388 0-6.627-5.373-12-12-12z"
            />
          </svg>
        </a>
        <!-- Web/Globe Logo -->
        <a
          href="https://itscipolletti.edu.ar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            class="w-6 h-6 text-gray-400 dark:text-gray-600 hover:text-gray-800 dark:hover:text-gray-200 transition-transform transform hover:scale-125"
          >
            <path
              d="M12 2c2.71 0 4.94.94 6.77 2.53C19.96 5.88 20 7.38 20 9s-.04 3.12-1.23 4.47C16.94 17.06 14.71 18 12 18s-4.94-.94-6.77-2.53C4.04 16.12 4 14.62 4 13s.04-3.12 1.23-4.47C7.06 4.94 9.29 4 12 4zM2 12c0 2.36.64 4.55 1.73 6.48C5.3 17.59 8.92 20 12 20c3.08 0 6.7-2.41 8.27-5.52C21.36 16.55 22 14.36 22 12c0-2.36-.64-4.55-1.73-6.48C18.7 6.41 15.08 4 12 4c-3.08 0-6.7 2.41-8.27 5.52C2.64 7.45 2 9.64 2 12z"
            />
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>
