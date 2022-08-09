import { createAsyncThunk } from '@reduxjs/toolkit'
import filterAPI from '../../../api/filterAPI'
import { DirectionsItem, FilterItem } from './types'

export const fetchDirections = createAsyncThunk<DirectionsItem[]>(
  'filter/directions',
  async () => {
    return await filterAPI.fetchDirections()
  },
)

export const fetchFilter = createAsyncThunk<FilterItem[]>('filter/filter', async () => {
  return await filterAPI.fetchFilter()
})
