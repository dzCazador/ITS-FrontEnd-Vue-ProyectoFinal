export interface Task {
  title: string
  description: string
  completed: boolean
}

export interface TaskState {
  loading: boolean
  data: Task[]
}

export interface TaskApiResponse {
  statusCode?: number
  message?: string | [string]
  error?: string
  id?: number
  createdAt?: string
  updatedAt?: string
  title?: string
  description?: string
  userId?: string
}
