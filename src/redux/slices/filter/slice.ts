import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchDirections, fetchFilter } from './asyncActions'
import { DirectionsItem, FilterSliceState } from './types'

const initialState: FilterSliceState = {
  directions: [],
  filter: [],
  currentDirections: [],
  currentFilter: [],
  currentFrom: null,
  currentTo: null,
  categoryFromId: 0,
  categoryToId: 0,
  isLoadingDirections: true,
  isLoadingFilter: true,
  fromOptions: [],
  toOptions: [],
}

const cryptoCodes = ['BTC', 'ETH', 'USDTTRC']
const bankCodes = ['ACRUB', 'SBERRUB', 'TCSBRUB']
const cashCodes = ['CASHRUB', 'CASHUSD']

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryFromId: (state, action: PayloadAction<number>) => {
      state.categoryFromId = action.payload
      checkFilter(state)
    },
    setCategoryToId: (state, action: PayloadAction<number>) => {
      state.categoryToId = action.payload
      checkFilter(state)
    },
    setCurrentFrom: (state, action: PayloadAction<DirectionsItem | null>) => {
      state.currentFrom = action.payload
      state.categoryToId = 0
      checkFilter(state)
    },
  },
  extraReducers: (builder) => {
    // Directions
    builder.addCase(fetchDirections.pending, (state) => {
      state.isLoadingDirections = true
    })
    builder.addCase(fetchDirections.fulfilled, (state, action) => {
      state.directions = action.payload
      state.currentDirections = action.payload
      state.currentFrom = action.payload[0]
      state.isLoadingDirections = false
      state.fromOptions = state.currentDirections.map((item) => ({
        value: item,
        label: item.name,
      }))
    })
    builder.addCase(fetchDirections.rejected, (state, action) => {})

    // Filter
    builder.addCase(fetchFilter.pending, (state) => {
      state.isLoadingFilter = true
    })
    builder.addCase(fetchFilter.fulfilled, (state, action) => {
      state.filter = action.payload
      state.isLoadingFilter = false
    })
    builder.addCase(fetchFilter.rejected, (state, action) => {})
  },
})

function checkFilter(state: FilterSliceState) {
  if (state.currentFrom && state.directions && state.filter) {
    switch (state.categoryFromId) {
      case 0:
        state.currentDirections = state.directions
        break
      case 1:
        state.currentDirections = state.directions.filter((item) =>
          cryptoCodes.includes(item.code),
        )
        break
      case 2:
        state.currentDirections = state.directions.filter((item) =>
          cashCodes.includes(item.code),
        )
        break
      case 3:
        state.currentDirections = state.directions.filter((item) =>
          bankCodes.includes(item.code),
        )
        break
      case 4:
        state.currentDirections = []
        state.currentFilter = []
        return
      default:
        state.currentDirections = []
        state.currentFilter = []
        break
    }

    state.currentFilter =
      state.filter.find((item) => {
        return item.from.code === state.currentFrom?.code
      })?.to || []

    if (state.categoryToId) {
      switch (state.categoryToId) {
        case 0:
          state.currentFilter =
            state.filter.find((item) => {
              return item.from.code === state.currentFrom?.code
            })?.to || []
          break
        case 1:
          state.currentFilter = state.currentFilter.filter((item) =>
            cryptoCodes.includes(item.code),
          )
          break
        case 2:
          state.currentFilter = state.currentFilter.filter((item) =>
            bankCodes.includes(item.code),
          )
          break
        case 3:
          state.currentFilter = []
          break
        case 4:
          state.currentFilter = state.currentFilter.filter((item) =>
            cashCodes.includes(item.code),
          )
          break
        default:
          break
      }

      state.toOptions = state.currentFilter.map((item) => ({
        value: item,
        label: item.name,
      }))
    }
  }
}

export const { setCategoryFromId, setCategoryToId, setCurrentFrom } = filterSlice.actions

export default filterSlice.reducer
