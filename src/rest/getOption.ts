import type { Express, Request, Response, NextFunction } from 'express'

import openPrices from '../data/openPrices'
import type { Prices } from '../types/Prices'
import findPrices from '../data/findPrices'
import findQuote from '../data/findOption'

const ONE_HOUR = 60 * 60 * 1000

export default async function getOption(req: Request, res: Response, next: NextFunction) {
  const symbol = req.params.SYMBOL
  const type = req.params.TYPE
  const date = req.params.DATE
  const strike = req.params.STRIKE

  let range = req.params.RANGE ?? '1M'

  if (range === '1M') {
    range = '20'
  } else if (range === '3M') {
    range = '60'
  } else if (range === '1Y') {
    range = '260'
  }

  const result = await findQuote(symbol, type, parseInt(range), date, parseFloat(strike))

  //res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
