  import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect } from 'react'
import type { ITaskTableProps } from '../../constants/Interfaces'
import { useTaskStore } from '../../stores/taskStore'
import { fetchTasks } from '@/lib/api'
import { usePrefetchQuery, useSuspenseQuery } from '@tanstack/react-query'
import { CreateTaskForm } from '../molecule/CreateTaskForm'
import { UpdateTaskForm } from '../molecule/UpdateTaskForm'


export default function TaskTable() {
  const tasks = useTaskStore(state => state.tasks)

  usePrefetchQuery({
      queryKey: ['task'],
      queryFn: fetchTasks,
      staleTime: 60 * 1000,
    })

  const { data } = useSuspenseQuery({ 
    queryKey: ['tasks'],
    queryFn: fetchTasks,
  })
  const setTasks = useTaskStore(state => state.addTasks)

  useEffect(() => {
    setTasks(data)
  }, [data, setTasks])


  const columnHelper = createColumnHelper<ITaskTableProps>()

  const columns = [
    columnHelper.accessor('id', {
      header: 'ID',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
  columnHelper.accessor('title', {
    header: 'Title',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('description', {
    header: 'Description',
    cell: info => (
      <div className="line-clamp-2 max-w-xs text-ellipsis overflow-hidden">
        {info.getValue()}
      </div>
    ),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('deadline', {
    header: 'Deadline',
    cell: info => new Date(info.getValue()).toLocaleDateString(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('is_completed', {
    header: 'Completed?',
    cell: info => (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${
          info.getValue() ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
        }`}
      >
        {info.getValue() ? 'Yes' : 'No'}
      </span>
    ),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('priority', {
    header: 'Priority',
    cell: info => (
      <span className="capitalize">{info.getValue()}</span>
    ),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('created_by', {
    header: 'Created By (User ID)',
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('created_ts', {
    header: 'Created At',
    cell: info => new Date(info.getValue()).toLocaleString(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('modified_ts', {
    header: 'Modified At',
    cell: info => new Date(info.getValue()).toLocaleString(),
    footer: info => info.column.id,
  }),
]

  const table = useReactTable({
    data: tasks ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
  <div className="p-4">
    <div className="overflow-x-auto min-w-2xs max-w-4xl">
      <table className="min-w-2xs max-w-xl border border-gray-300 divide-y divide-gray-200 text-sm md:text-base">
        <thead className="bg-gray-100">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left font-semibold text-gray-700 whitespace-nowrap"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-100">
          {table.getRowModel().rows.map(row => (
            <tr
              key={row.id}
              className="bg-gray-50"
            >
              {row.getVisibleCells().map(cell => (
                <td
                  key={cell.id}
                  className="px-4 py-2 text-gray-800 whitespace-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="mt-4 flex justify-center gap-2">
      <CreateTaskForm />
      <UpdateTaskForm />
    </div>
  </div>
);

}
