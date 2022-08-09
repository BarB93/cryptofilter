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
        state.currentFilter =
          state.filter.find((item) => {
            debugger
            return item.from.code === state.currentFrom?.code
          })?.to || []

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
      default:
        state.currentDirections = []
        state.currentFilter = []
        break
    }

    // const filterItem = state.filter.filter(
    //   (item) => item.from.code === state.currentFrom?.code,
    // )

    // if (filterItem) {
    //   state.currentTo = filterItem[0].to
    // }
  }
}

export const { setCategoryFromId, setCategoryToId, setCurrentFrom } = filterSlice.actions

export default filterSlice.reducer
