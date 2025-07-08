// lib/api.ts
import { TASK_UPDATE_DATA, type ITaskTableProps, type TaskUpdateForm } from '@/constants/Interfaces'
import { axiosInstance } from './axios'

const authAxios = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  return axiosInstance.create({
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })
}

export const fetchTasks = async (): Promise<ITaskTableProps[]> => {
  const res = await authAxios().get('/api/v1/task/')
  return res.data
}

export const createTask = async (task: {
  title: string
  description: string
  deadline: string // ISO format
  status: string // e.g., "Upcoming"
}): Promise<ITaskTableProps> => {
  const res = await authAxios().post('/api/v1/task/', task)
  return res.data
}

export const updateTask = async (task: TaskUpdateForm): Promise<ITaskTableProps> => {
  const res = await authAxios().patch(`/api/v1/task/${task.id}/`, TASK_UPDATE_DATA)
  return res.data
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await axiosInstance.post('/api/v1/login/', credentials)
  return res.data
}