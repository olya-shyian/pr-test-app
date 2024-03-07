import React from 'react'
import { TodoItem } from '../TodoItem'
import { Todo } from '../../interfaces/Todo'
import List from '@mui/material/List'
import styles from './todoList.module.scss'

interface Props {
  todos: Todo[]
}

export const TodoList: React.FC<Props> = React.memo(({ todos }) => {
  return (
    <List className={styles['todo-list']}>
      {todos.map((todo) => <TodoItem todo={todo} key={todo.id} />)}
    </List>
  )
})
