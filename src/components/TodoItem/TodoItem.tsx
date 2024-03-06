import React, { useRef, useState } from 'react'
import cn from 'classnames'
import { Todo } from '../../interfaces/Todo'
import { useAppDispatch } from '../../app/hooks'
import { actions as todoActions } from '../../features/todoSlice'
import Checkbox from '@mui/material/Checkbox'
import ListItemButton from '@mui/material/ListItemButton'
import styles from './todoItem.module.scss'

interface Props {
  todo: Todo
}

export const TodoItem: React.FC<Props> = React.memo(({ todo }) => {
  const [isEditing, setIsEditing] = useState(false)
  const editInput = useRef<HTMLInputElement>(null)
  const { id, title, completed } = todo
  const [editInputValue, setEditInputValue] = useState(title)
  const normalizedEditInputValue = editInputValue.trim()
  const dispatch = useAppDispatch()

  const handleTodoEdit = () => {
    if (normalizedEditInputValue !== title) {
      if (normalizedEditInputValue === '') {
        dispatch(todoActions.delete(todo))
      } else {
        dispatch(
          todoActions.update({
            ...todo,
            title: normalizedEditInputValue,
          })
        )

        setEditInputValue(normalizedEditInputValue)
      }
    }

    setIsEditing(false)
  }

  const keyboardListener = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        setIsEditing(false)
        setEditInputValue(title)

        document.removeEventListener('keyup', keyboardListener)
        break
      case 'Enter':
        handleTodoEdit()
        document.removeEventListener('keyup', keyboardListener)
        break
      default:
        break
    }
  }

  const handleBlur = () => {
    window.setTimeout(() => {
      if (isEditing) {
        handleTodoEdit()
      }
    }, 5)
  }

  const onToggleChange = () =>
    dispatch(
      todoActions.update({
        ...todo,
        completed: !todo.completed,
      })
    )

  const onEditing = () => {
    if (!isEditing) {
      setIsEditing(true)
      document.addEventListener('keyup', keyboardListener)

      window.setTimeout(() => editInput.current?.focus(), 5)
    }
  }

  if (isEditing) {
    document.removeEventListener('keyup', keyboardListener)
    document.addEventListener('keyup', keyboardListener)
  }

  return (
    <li
      className={cn(styles['list-item'], {
        [styles.completed]: completed,
        [styles.editing]: isEditing,
      })}>
      <div className={styles.item} onDoubleClick={onEditing}>
        <Checkbox
          checked={completed}
          id={`toggle-view${id}`}
          className={styles.checkbox}
          inputProps={{ 'aria-label': 'controlled' }}
          onChange={onToggleChange}
        />

        <ListItemButton>
          <label htmlFor={`toggle-view${id}`}  className={styles.label}>{title}</label>
        </ListItemButton>

        <button
          type="button"
          className={styles.delete}
          onClick={() => dispatch(todoActions.delete(todo))}
        />
      </div>

      <input
        ref={editInput}
        value={editInputValue}
        onChange={(event) => setEditInputValue(event.target.value)}
        onBlur={handleBlur}
        type="text"
        className={styles.edit}
      />
    </li>
  )
})
