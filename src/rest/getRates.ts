import type { Express, Request, Response, NextFunction } from 'express'

import openPrices from '../data/openPrices'
import type { Prices } from '../types/Prices'
import findPrices from '../data/findPrices'
import findQuote from '../data/findOption'
import loadCurrencies from '../data/loadCurrencies'
import findRates from '../data/findRates'

const ONE_HOUR = 60 * 60 * 1000

export default async function getGetRates(req: Request, res: Response, next: NextFunction) {
  const currency = req.params.CURRENCY
  const date = req.params.DATE
  let range = req.params.RANGE

  let duration

  if (range === '1M') {
    duration = 20
  } else if (range === '3M') {
    duration = 60
  } else if (range === '1Y') {
    duration = 260
  } else {
    duration = parseInt(range)
  }

  if (currency == null) {
    const currencies = await loadCurrencies()
    // console.log('getGetRatesByCurrency', currency, duration, date)

    // res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

    res.send(currencies)
  } else {
    const result = await findRates(currency, duration, date)

    // console.log('getGetRatesByCurrency', currency, duration, date)

    // res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

    res.send(result)
  }
}
