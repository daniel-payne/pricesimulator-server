import openPrices from './openPrices'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Prices } from '../types/Prices'
import loadMarkets from './loadMarkets'
import type { Markets } from '../types/Markets'

export default async function findMarkets(symbol: string) {
  const result = await loadMarkets(symbol)

  return result.length > 0 ? result[0] : {}
}
