export interface ITaskTableProps {
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

export interface TaskState {
  tasks: ITaskTableProps[]
  addTask: (task: ITaskTableProps) => void
  clearTasks: () => void
}