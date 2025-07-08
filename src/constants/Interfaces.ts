export interface ITaskTableProps {
  id: number
  title: string
  description: string
  deadline: string
  is_completed: boolean
  status: string
  priority: string
  created_by: number
  created_ts: string
  modified_ts: number
}

export interface TaskFormValues {
  title: string
  description: string
  deadline: string
}

export interface TaskUpdateForm {
  id: number
}

export interface TaskState {
  tasks: ITaskTableProps[]
  addTasks: (task: ITaskTableProps[]) => void
  clearTasks: () => void
}

export interface LoginFormInputs {
  email: string
  password: string
}

export const TASK_UPDATE_DATA = {
  is_completed: true,
   status: 'Completed'
}