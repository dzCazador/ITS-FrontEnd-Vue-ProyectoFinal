import { defineStore } from 'pinia'
import type { Task, TaskState } from '@/models/TaskModel'

import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/services/task/TaskController'

export const useTaskStore = defineStore({
  id: 'task',
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    async create(task: Task) {
      this.loading = true // mostrar el loading
      console.info('[Task Store 💾] Intentando crear una nueva tarea')
      try {
        const response = await createTask(task)
        if (response.status === 201) {
          //Task Created
          let newId: number = response.data.id!
          console.log(newId)
          let newTask: Task = { ...task, id: newId } //Agregar el id a la tarea
          this.data.push(newTask) // agregamos la tarea al estado
          console.info('[API 🌐] Nueva tarea agregada')
          await this.getAll() // refrescamos todas las tareas
        }
      } catch (e) {
        console.error('[API 🌐] Error creando la tarea', e) // informamos el error
        this.loading = false // paramos el loading
      }
    },
    async getAll() {
      this.loading = true
      try {
        const response = await getTasks()
        if (response.status === 200 && response.data) {
        } else {
          console.error('Error fetching tasks:', response)
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },
    async edit(task: Task) {
      this.loading = true // spinner
      const index = this.data.findIndex((item) => item.id === task.id) // encontramos el indice en el arreglo data
      this.data[index] = task
      console.info('[Tasks Store 💾] Intentando actualizar la tarea')
      try {
        console.log(task)
        const response = await updateTask(task.id!, task)
        console.info('[API 🌐] Tarea con id: ', response.data.id, ' actualizada')
        this.loading = false // paramos el loading
      } catch (e) {
        console.error('[API 🌐] Error actualizando la tarea', e) // informamos el error
        this.loading = false // paramos el loading
      }
    },
  },
})
