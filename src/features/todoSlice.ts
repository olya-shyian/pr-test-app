import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { getLocalStorage } from '../services/getLocalStorage'
import { Todo } from '../interfaces/Todo'
import { LOCAL_STORAGE_TODO_KEY } from '../consts/commonConsts'
import { FilterOptions } from '../enums/FilterOptions'

const [localTodoItems, setLocalTodoItems] = getLocalStorage(
  LOCAL_STORAGE_TODO_KEY,
  [],
)

const initialState = {
  'todos': localTodoItems as Todo[],
  'errorMessage': '',
  'chosenfilterOption': FilterOptions.All,
}

const todoSlice = createSlice({
  'name': 'todo',
  initialState,
  'reducers': {
    'add': (state, action: PayloadAction<Todo>) => {
      state.todos = [...state.todos, action.payload]

      setLocalTodoItems(state.todos)
    },

    'delete': (state, action: PayloadAction<Todo>) => {
      const newTodos = state.todos.filter(
        (currentTodo) => currentTodo.id !== action.payload.id,
      )

      state.todos = newTodos

      setLocalTodoItems(state.todos)
    },

    'update': (state, action: PayloadAction<Todo>) => {
      const todoCopy = [...state.todos]
      const editedTodoIndex = todoCopy.findIndex(
        (currentTodo) => currentTodo.id === action.payload.id,
      )

      todoCopy[editedTodoIndex] = action.payload
      state.todos = todoCopy

      setLocalTodoItems(state.todos)
    },

    'setFilterOption': (state, action: PayloadAction<FilterOptions>) => {
      state.chosenfilterOption = action.payload
    },

    'setErrorMessage': (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload
    },
  },
})

export const todoReducer = todoSlice.reducer

export const actions = { ...todoSlice.actions }
