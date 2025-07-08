import { create } from 'zustand'
import type { TaskState } from '../constants/Interfaces'

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  addTasks: (newTasks) => set(state => ({ tasks: [...state.tasks, ...newTasks] })),
  clearTasks: () => set({ tasks: [] }),
}))