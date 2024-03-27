import openPrices from './openPrices'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Prices } from '../types/Prices'

export default async function findPrices(symbol: string, fields?: string, date?: string | number) {
  const result: any = {}

  const prices = await openPrices(symbol)

  let properties = []
  let index = -1

  if (fields == null || fields?.toUpperCase() === 'ALL') {
    properties = ['timestamps', 'opens', 'highs', 'lows', 'closes']
  } else {
    properties = fields.replaceAll(' ', '').split(',')
  }

  if (date) {
    const match = Number.isInteger(date) ? (date as number) : new Date(date).getTime()

    index = searchArrayForMatch(prices.timestamps, match)
  }

  if (index === -1 && date != null) {
    result.noData = true

    return result
  }

  for (const property of properties) {
    const data = prices[property as keyof Prices]

    const item = index > -1 ? [data[index]] : data

    result[property as keyof Prices] = item
  }

  return result
}
