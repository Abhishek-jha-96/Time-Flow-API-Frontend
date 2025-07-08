// lib/api.ts
import type { ITaskTableProps } from '@/constants/Interfaces'
import { axiosInstance } from './axios'

export const fetchTasks = async (): Promise<ITaskTableProps[]> => {
  const res = await axiosInstance.get('/api/tasks')
  return res.data
}

export const fetchUser = async () => {
  const res = await axiosInstance.get('/api/user')
  return res.data
}

export const loginUser = async (credentials: { email: string; password: string }) => {
  const res = await axiosInstance.post('/api/login', credentials)
  return res.data
}