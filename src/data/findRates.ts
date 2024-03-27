import openPrices from './openPrices'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Prices } from '../types/Prices'
import loadCurrencies from './loadCurrencies'
import findPrices from './findPrices'

export default async function findRates(currency: string, duration: number, date?: string | number) {
  const currencies = await loadCurrencies()

  let range = '1Y'

  if (duration <= 20) {
    range = '1M'
  } else if (duration <= 60) {
    range = '3M'
  }

  let matches = currencies.filter((item: any) => item.currency === currency.toUpperCase()).filter((item: any) => item.range === range)

  let symbol = 'UKOUSD1Y'

  if (matches?.length > 0) {
    symbol = matches[0].symbol
  }

  const result = await findPrices(symbol, 'timestamps,opens', date)

  result.currency = currency
  result.duration = duration
  result.date = date

  return result
}
