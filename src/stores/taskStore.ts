import { create } from 'zustand'
import type { TaskState } from '../constants/Interfaces'

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  addTask: (task) => set(state => ({ tasks: [...state.tasks, task] })),
  clearTasks: () => set({ tasks: [] }),
}))