import type { Express, Request, Response, NextFunction } from 'express'

import openPrices from '../data/openPrices'
import type { Prices } from '../types/Prices'
import findPrices from '../data/findPrices'

const ONE_HOUR = 60 * 60 * 1000

export default async function getPrices(req: Request, res: Response, next: NextFunction) {
  const symbol = req.params.SYMBOL
  const field = req.params.FIELD as keyof Prices | undefined
  const date = req.params.DATE

  const result = await findPrices(symbol, field, date)

  //console.log('getPricesBySymbol', symbol, field, date, result?.timestamps?.length)

  //res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
