import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { FilterOptions } from '../../enums/FilterOptions'
import { actions as todoActions } from '../../features/todoSlice'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import type { SelectChangeEvent } from '@mui/material/Select'

export const TodosFilter: React.FC = () => {
  const dispatch = useAppDispatch()
  const { chosenfilterOption } = useAppSelector((state) => state.todoReducer)

  const onFilterStatusChanged = (event: SelectChangeEvent) => {
    if (event.target.value !== chosenfilterOption) {
      dispatch(todoActions.setFilterOption(event.target.value as FilterOptions))
    }
  }

  return (
    <FormControl sx={{ minWidth: 150 }} size="small">
      <InputLabel id="demo-simple-select-standard-label">Status</InputLabel>
      <Select
        labelId="demo-simple-select-standard-label"
        id="demo-select-small"
        label="Status"
        defaultValue={FilterOptions.All}
        onChange={onFilterStatusChanged}>
        <MenuItem value={FilterOptions.All}>All</MenuItem>
        <MenuItem value={FilterOptions.Current}>Current</MenuItem>
        <MenuItem value={FilterOptions.Completed}>Completed</MenuItem>
      </Select>
    </FormControl>
  )
}
