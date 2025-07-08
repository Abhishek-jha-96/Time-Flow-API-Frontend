// lib/api.ts
import type { ITaskTableProps } from '@/constants/Interfaces'
import axios from 'axios'

export const fetchTasks = async (): Promise<ITaskTableProps[]> => {
  const res = await axios.get('/api/tasks')
  return res.data
}

export const fetchUser = async () => {
  const res = await axios.get('/api/user')
  return res.data
}

export const loginUser = async (credentials: { username: string; password: string }) => {
  const res = await axios.post('/api/login', credentials)
  return res.data
}