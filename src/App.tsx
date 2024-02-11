import { FormEvent, useState } from 'react'
import { IToDo, useTodoStore } from './store/todoStore'

const App = () => {
  const { addToDo, todos, completeToDo, deleteToDo, deleteAll, updateToDo } =
    useTodoStore(state => state)

  const [input, setInput] = useState<string>('')
  const [editMode, setEditMode] = useState<boolean>(false)
  const [editId, setEditId] = useState<string>('')
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const todo: IToDo = {
      id: crypto.randomUUID(),
      title: input,
      isCompleted: false,
    }
    if (!input) return
    if (editMode) {
      updateToDo(editId, input)
      setEditMode(false)
    } else {
      addToDo(todo)
    }
    setInput('')
  }

  const handleEdit = (id: string, title: string) => {
    setInput(title)
    setEditId(id)
    setEditMode(true)
  }

  const totalTodos = todos.length
  const completedTodos = todos.filter(todo => todo.isCompleted === true).length
  const remainingTodos = totalTodos - completedTodos

  return (
    <div className='flex justify-center pt-8  px-4 md:px-0'>
      <div className='bg-slate-800 p-4 w-full md:w-[450px]  rounded'>
        <h1 className='text-xl'>ToDo App</h1>
        <p>Add your daily task</p>

        <form
          className='mt-4 gap-2 flex items-center w-full'
          onSubmit={handleSubmit}
        >
          <input
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            className=' w-5/6 px-2 py-1 text-black outline-none rounded'
            placeholder='Enter ToDo Name'
          />
          <input
            type='submit'
            className='bg-green-500 px-2 py-1 rounded hover:bg-green-600 cursor-pointer'
            value={editMode ? 'Update Todo' : 'Add Todo'}
          />
        </form>

        <div className='mt-6 flex flex-col gap-4'>
          {todos.length ? (
            todos.map(todo => (
              <div
                key={todo.id}
                className={`w-full border border-green-600 rounded p-2 flex justify-between ${
                  todo.isCompleted && 'opacity-50 border-gray-500'
                }`}
              >
                <div className='flex items-center gap-2'>
                  <input
                    checked={todo.isCompleted}
                    type='checkbox'
                    onChange={e => completeToDo(todo.id, e.target.checked)}
                  />
                  <span>{todo.title}</span>
                </div>
                <div className='space-x-4 flex'>
                  <span
                    className='text-blue-500 cursor-pointer'
                    onClick={() => handleEdit(todo.id, todo.title)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-file-pen-line'
                    >
                      <path d='m18 5-3-3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2' />
                      <path d='M8 18h1' />
                      <path d='M18.4 9.6a2 2 0 1 1 3 3L17 17l-4 1 1-4Z' />
                    </svg>
                  </span>
                  <span
                    className='text-red-500 cursor-pointer'
                    onClick={() => deleteToDo(todo.id)}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='18'
                      height='18'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      className='lucide lucide-trash'
                    >
                      <path d='M3 6h18' />
                      <path d='M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6' />
                      <path d='M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2' />
                    </svg>
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p>There is no todos available</p>
          )}
        </div>
        <button
          onClick={deleteAll}
          className='mt-4 bg-red-500 px-2 text-sm py-1 rounded hover:bg-red-600 transition ease-in-out cursor-pointer'
        >
          Clear All
        </button>
        <div className='mt-6 text-sm space-y-3'>
          <p>Statistics:</p>
          <ul className='space-y-1'>
            <li>Total Todos - {totalTodos || 'No Todos'}</li>
            <li>Completed Todos - {completedTodos || 'No Completed Todos'}</li>
            <li>Remaining Todos - {remainingTodos || 'No Remaining Todos'}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
export default App
