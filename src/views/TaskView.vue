<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import type { Task } from '../models/TaskModel'
import { useTaskStore } from '@/stores/TaskStore'
import { useThemeStore } from '@/stores/ThemeStore'

// tema para el estilo del sitio, pinia ya retorna un elemento rectivo
const theme = useThemeStore()
const tasks = useTaskStore()

// Estado para el formulario

const form = reactive<Task>({
  id: null,
  title: '',
  description: '',
})

const showCreateModal = ref(false)
const isEditing = ref(false)

// Métodos CRUD
const handleSave = () => {
  if (isEditing.value) {
    // Editar un task
    const editedTask: Task = { id: form.id, title: form.title, description: form.description } // Asignamos un id único
    tasks.edit(editedTask)
  } else {
    // Crear un nuevo task
    const newTask: Task = { title: form.title, description: form.description } // Asignamos un id único
    tasks.create(newTask)
  }
  resetForm()
  showCreateModal.value = false
}

const edittask = (task) => {
  Object.assign(form, task) // Copiar los valores de task al formulario
  isEditing.value = true
  showCreateModal.value = true
}

const deletetask = (task) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) tasks.delete(task)
}

const resetForm = () => {
  form.id = null
  form.title = ''
  form.description = ''
  isEditing.value = false
}

//Traer todas las tareas
onMounted(() => {
  tasks.getAll()
})
</script>

<template>
  <div class="container mx-auto p-3 sm:px-0 min-h-screen">
    <div class="mb-4">
      <button
        @click="resetForm(), (showCreateModal = true)"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Agregar Nuevo
      </button>
    </div>

    <!-- Tabla de Datos -->
    <table
      class="min-w-full table-auto bg-white border border-gray-300 rounded-lg shadow-md dark:bg-gray-700 dark:text-white"
    >
      <thead>
        <tr>
          <th class="px-4 py-2 text-left">Id</th>
          <th class="px-4 py-2 text-left">T&iacute;tulo</th>
          <th class="px-4 py-2 text-left">Descripci&oacute;n</th>
          <th class="px-4 py-2 text-left">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks.data" :key="task.id">
          <td class="px-4 py-2">{{ task.id }}</td>
          <td class="px-4 py-2">{{ task.title }}</td>
          <td class="px-4 py-2">{{ task.description }}</td>
          <td class="px-4 py-2">
            <button
              @click="edittask(task)"
              class="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              @click="deletetask(task)"
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
      class="fixed inset-x-0 top-20 bg-black bg-opacity-50 flex justify-center items-star"
    >
      <div class="bg-white p-6 rounded-lg shadow-md w-96">
        <h3 class="text-xl font-semibold mb-4">{{ isEditing ? 'Editar' : 'Agregar' }} Tarea</h3>
        <form @submit.prevent="handleSave">
          <div class="mb-4">
            <label for="title" class="block text-gray-700">Id</label>
            <input
              v-model="form.id"
              type="text"
              id="titles"
              class="w-full px-4 py-2 border rounded-md"
              readonly
              disabled
            />
          </div>
          <div class="mb-4">
            <label for="title" class="block text-gray-700">T&iacute;tulo</label>
            <input
              v-model="form.title"
              type="text"
              id="titles"
              class="w-full px-4 py-2 border rounded-md"
              required
            />
          </div>
          <div class="mb-4">
            <label for="description" class="block text-gray-700">Descripci&oacute;n</label>
            <textarea
              v-model="form.description"
              id="description"
              class="w-full px-4 py-10 border rounded-md"
              required
            ></textarea>
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
