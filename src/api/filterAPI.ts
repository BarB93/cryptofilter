import { DirectionsItem, FilterItem } from '../redux/slices/filter/types'
import { $host } from './index'

const filterAPI = {
  async fetchDirections() {
    const { data } = await $host.get<DirectionsItem[]>('/directions', {})
    return data as DirectionsItem[]
  },
  async fetchFilter() {
    const { data } = await $host.get<FilterItem[]>('/filter', {})
    return data as FilterItem[]
  },
}

export default filterAPI
