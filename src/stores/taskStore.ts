import { create } from 'zustand'
import type { TaskState } from '../constants/Interfaces'

export const useTaskStore = create<TaskState>(set => ({
  tasks: [],
  addTasks: (newTasks) => set({ tasks: newTasks }), // ← Replace, not append
  clearTasks: () => set({ tasks: [] }),
}))