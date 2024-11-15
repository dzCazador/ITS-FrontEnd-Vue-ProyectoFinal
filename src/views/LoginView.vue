<script setup>
import { ref } from 'vue'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { useThemeStore } from '@/stores/ThemeStore'

import RegisterComponent from '@/components/auth/RegisterComponent.vue'
import LoginComponent from '@/components/auth/LoginComponent.vue'

const categories = ref({ Login: [], Registro: [] })
</script>

<template>
  <div class="w-full px-2 py-16 sm:px-0">
    <TabGroup>
      <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
        <Tab
          v-for="category in Object.keys(categories)"
          as="template"
          :key="category"
          v-slot="{ selected }"
        >
          <button
            :class="[
              'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
              'ring-white/60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
              selected
                ? 'bg-white text-blue-700 shadow'
                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
            ]"
          >
            {{ category }}
          </button>
        </Tab>
      </TabList>

      <TabPanels class="mt-2">
        <TabPanel class="w-full">
          <LoginComponent />
        </TabPanel>
        <TabPanel class="w-full">
          <RegisterComponent />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>
