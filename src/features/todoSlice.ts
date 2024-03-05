import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../services/getLocalStorage'
import { Todo } from '../interfaces/Todo'
import { localStorageCartKey } from '../consts/commonConsts'

const [localTodoItems, setLocalTodoItems] = getLocalStorage(
  localStorageCartKey,
  []
)

const initialState = {
  todos: localTodoItems as Todo[],
}

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload]

      setLocalTodoItems(state.todos)
    },
  },
})

export const todoReducer = todoSlice.reducer

export const actions = { ...todoSlice.actions }
