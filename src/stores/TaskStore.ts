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
  id: 'theme',
  state: (): TaskState => ({
    loading: false,
    data: [],
  }),
  actions: {
    create(task: Task) {
      let id: number = this.data.length
      this.data.push(task)
    },
    async getAll() {
      this.loading = true
      try {
        const response = await getTasks()
        if (response.status === 200 && response.data) {
          //this.data = response.data
        } else {
          console.error('Error fetching tasks:', response)
        }
      } catch (error) {
        console.error('Error fetching tasks:', error)
      } finally {
        this.loading = false
      }
    },
  },
})
