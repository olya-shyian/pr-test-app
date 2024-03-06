import React, { useMemo, useState } from 'react'
import { TodoList } from '../TodoList'
import { FilterOptions } from '../../enums/FilterOptions'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { actions as todoActions } from '../../features/todoSlice'
import { TodosFilter } from '../TodosFilter'
import { filterTodos } from '../../utils/filterTodos'
import TextField from '@mui/material/TextField'
import Paper from '@mui/material/Paper'
import FormHelperText from '@mui/material/FormHelperText'
import { MAX_ALLOW_CHARACTERS } from '../../consts/commonConsts'
import { ErrorMessagesEnum } from '../../enums/ErrorMessagesEnum'
import styles from './todoApp.module.scss'

export const TodoApp: React.FC = () => {
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const dispatch = useAppDispatch()
  const { todos, chosenfilterOption, errorMessage } = useAppSelector(
    (state) => state.todoReducer
  )

  const filteredTodos = useMemo(
    () => filterTodos(todos, chosenfilterOption),
    [todos, chosenfilterOption]
  )

  const todosCount = todos.filter((todo) =>
    chosenfilterOption === FilterOptions.Active
      ? !todo.completed
      : todo.completed
  ).length

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedTitle = newTodoTitle.trim()

    if (newTodoTitle && normalizedTitle && !errorMessage) {
      dispatch(
        todoActions.add({
          id: +new Date(),
          title: normalizedTitle,
          completed: false,
        })
      )

      setNewTodoTitle('')
    }
  }

  const onTodoChange = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value.length > MAX_ALLOW_CHARACTERS) {
      dispatch(
        todoActions.setErrorMessage(ErrorMessagesEnum.MaxTodoTitleLength)
      )
    } else {
      dispatch(todoActions.setErrorMessage(''))
      setNewTodoTitle(event.target.value)
    }
  }

  return (
    <Paper elevation={3} className={styles['todo-app']}>
      <header className={styles.header}>
        <h1>ToDo list</h1>

        <TodosFilter />

        {chosenfilterOption !== FilterOptions.All &&
          <span className={styles['todo-count']}>{`${todosCount} items`}</span>
        }

        <form onSubmit={handleSubmit} className={styles['add-todo-form']}>
          <TextField
            id="component-error"
            aria-describedby="component-error-text"
            variant="outlined"
            label="Add a ToDo"
            className={styles['add-todo-input']}
            value={newTodoTitle}
            onChange={onTodoChange}
            error={errorMessage !== ''}
          />

          {errorMessage &&
            <FormHelperText id="component-error-text" error>
              {errorMessage}
            </FormHelperText>
          }
        </form>
      </header>

      {!!todos.length && <TodoList todos={filteredTodos} />}
    </Paper>
  )
}
