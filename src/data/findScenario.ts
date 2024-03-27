import openPrices from './openPrices'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Prices } from '../types/Prices'
import loadScenarios from './loadScenarios'
import type { Markets } from '../types/Markets'

export default async function findScenario(symbol: string) {
  const result = await loadScenarios(symbol)

  return result[0]
}
