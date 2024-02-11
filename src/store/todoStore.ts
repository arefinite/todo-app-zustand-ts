import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export interface IToDo {
  id: string
  title: string
  isCompleted: boolean
}

interface IStates {
  todos: IToDo[] | []
}

interface IActions {
  addToDo: (todo: IToDo) => void
  deleteToDo: (id: string) => void
  updateToDo: (id: string, title: string) => void
  completeToDo: (id: string, checked: boolean) => void
  deleteAll: () => void
}

export const useTodoStore = create<IStates & IActions>()(
  devtools(
    persist(
      set => ({
        todos: [],
        addToDo: (todo: IToDo) => {
          set(state => ({
            todos: [...state.todos, todo],
          }))
        },
        completeToDo: (id: string, checked: boolean) => {
          set(state => ({
            todos: state.todos.map(todo => {
              if (todo.id === id) {
                todo.isCompleted = checked
              }
              return todo
            }),
          }))
        },
        deleteToDo: (id: string) => {
          set(state => ({
            todos: state.todos.filter(todo => todo.id !== id),
          }))
        },
        deleteAll: () => {
          set(() => ({
            todos: [],
          }))
        },
        updateToDo: (id: string, title: string) => {
          set(state => ({
            todos: state.todos.map(todo =>
              todo.id === id ? { ...todo, title } : todo
            ),
          }))
        },
      }),

      { name: 'todoStore' }
    )
  )
)
