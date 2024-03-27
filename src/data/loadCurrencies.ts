import openPrices from './openPrices'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Prices } from '../types/Prices'
import findMarkets from './findMarkets'
import cache from './utilities/cache'

const KEY = 'interest-rates'
const CATEGORY = 'moneymarket'

export default async function loadCurrencies() {
  let result

  if (cache.has(KEY)) {
    console.log('CACHE --> RATES') //, key);

    result = await cache.get(KEY)
  } else {
    const markets = await findMarkets(CATEGORY)

    const data = markets[CATEGORY]

    result = data.map((market: any) => {
      const { name, symbol } = market
      const data = name.split(' ')

      const currency = data[1]
      const range = data[2]

      return { currency, range, name, symbol }
    })

    await cache.set(KEY, result)

    console.log('CACHE <-- RATES') //, key);
  }

  return result
}
