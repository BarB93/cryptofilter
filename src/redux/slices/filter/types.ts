// export enum СryptocurrencyEnum {
//   BTC = 'BTC',
//   ETH = 'ETH',
//   USDTTRC = 'USDTTRC',
// }

// export enum BanksEnum {
//   ACRUB = 'ACRUB',
//   SBERRUB = 'SBERRUB',
//   TCSBRUB = 'TCSBRUB',
// }

// export enum CashEnum {
//   CASHUSD = 'CASHUSD',
//   CASHRUB = 'CASHRUB',
// }

type Cryptocurrencies = 'BTC' | 'ETH' | 'USDTTRC'
type Banks = 'ACRUB' | 'SBERRUB' | 'TCSBRUB'
type Cash = 'CASHRUB' | 'CASHUSD'

type Code = Cryptocurrencies | Banks | Cash

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
  currentFilter: ToDirection[]
  categoryToId: number
  categoryFromId: number
  isLoadingFilter: boolean
  isLoadingDirections: boolean
  currentFrom: DirectionsItem | null
  currentTo: ToDirection[] | null
}
