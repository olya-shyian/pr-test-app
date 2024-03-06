import { FilterOptions } from '../enums/FilterOptions'
import { Todo } from '../interfaces/Todo'

export const filterTodos = (todos: Todo[], filterOpitons: FilterOptions) => {
  switch (filterOpitons) {
    case FilterOptions.Current:
      return todos.filter(({ completed }) => !completed)

    case FilterOptions.Completed:
      return todos.filter(({ completed }) => completed)

    default:
      return [...todos]
  }
}
