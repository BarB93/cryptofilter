// enum Сryptocurrency {
//   BTC = 'BTC',
//   ETH = 'ETH',
//   USDTTRC = 'USDTTRC',
// }

// enum Banks {
//   ACRUB = 'ACRUB',
//   SBERRUB = 'SBERRUB',
//   TCSBRUB = 'TCSBRUB',
// }

// enum Cash {
//   CASHUSD = 'CASHUSD',
//   CASHRUB = 'CASHRUB',
// }

type Сryptocurrency = 'BTC' | 'ETH' | 'USDTTRC'
type Banks = 'ACRUB' | 'SBERRUB' | 'TCSBRUB'
type Cash = 'CASHUSD' | 'CASHRUB'

type Code = Сryptocurrency | Banks | Cash

export type DirectionsItem = {
  code: Code
  name: string
}

type ToDirection = {
  code: string
  name: string
}

export type FilterItem = {
  from: {
    code: Code
    name: string
  }
  to: ToDirection[]
}

export type FilterSliceState = {
  directions: DirectionsItem[]
  currentDirections: DirectionsItem[]
  filter: FilterItem[]
  currentFilter: FilterItem[]
  categoryToId: number
  categoryFromId: number
  isLoadingFilter: boolean
  isLoadingDirections: boolean
  currentFrom: DirectionsItem | null
  currentTo: ToDirection[] | null
}
