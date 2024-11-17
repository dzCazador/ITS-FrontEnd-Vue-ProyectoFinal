<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { Task } from '../models/TaskModel'
import { useTaskStore } from '@/stores/TaskStore'
import { useThemeStore } from '@/stores/ThemeStore'

const themeStore = useThemeStore()
const theme = reactive(themeStore)

const taskStore = useTaskStore()
const tasks = reactive(taskStore)

// Estado para el formulario
const form = ref({ id: null, name: '' })
const showCreateModal = ref(false)
const isEditing = ref(false)

// Métodos CRUD
const handleSave = () => {
  if (isEditing.value) {
    // Editar un task
    const index = tasks.value.findIndex((task) => task.id === form.value.id)
    if (index !== -1) {
      tasks.value[index] = { ...form.value }
    }
  } else {
    // Crear un nuevo task
    const newtask = { ...form.value, id: Date.now() } // Asignamos un id único
    tasks.value.push(newtask)
  }
  resetForm()
  showCreateModal.value = false
}

const edittask = (task) => {
  form.value = { ...task }
  isEditing.value = true
  showCreateModal.value = true
}

const deletetask = (id) => {
  const index = tasks.value.findIndex((task) => task.id === id)
  if (index !== -1) {
    tasks.value.splice(index, 1)
  }
}

const resetForm = () => {
  form.value = { id: null, name: '' }
  isEditing.value = false
}

tasks.get
</script>

<template>
  <div class="container mx-auto p-3">
    <div class="mb-4">
      <button
        @click="showCreateModal = true"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar Nuevo
      </button>
    </div>

    <!-- Tabla de Datos -->
    <table class="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md">
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">ID</th>
          <th class="px-4 py-2 text-left">Nombre</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks.data" :key="task.id">
          <td class="px-4 py-2">{{ task.id }}</td>
          <td class="px-4 py-2">{{ task.name }}</td>
          <td class="px-4 py-2">
            <button
              @click="edittask(task)"
              class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              @click="deletetask(task.id)"
              class="bg-red-500 text-white px-2 py-1 rounded ml-2 hover:bg-red-600"
            >
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal para Crear/Editar -->
    <div
      v-if="showCreateModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex justify-center tasks-center"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar' : 'Agregar' }} Tarea</h3>
        <form @submit.prevent="handleSave">
          <div class="mb-4">
            <label for="name" class="block text-gray-700">Nombre</label>
            <input
              v-model="form.name"
              type="text"
              id="name"
              class="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>

          <div class="flex justify-between">
            <button
              type="button"
              @click="showCreateModal = false"
              class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            >
              {{ isEditing ? 'Actualizar' : 'Crear' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos adicionales */
</style>
