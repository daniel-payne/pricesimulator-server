import type { Express, Request, Response, NextFunction } from 'express'

import findVolatilities from '../data/findVolatilities'

import type { Volatilities } from '../types/Volatilities'

const ONE_HOUR = 60 * 60 * 1000

export default async function getVolatilities(req: Request, res: Response, next: NextFunction) {
  const symbol = req.params.SYMBOL
  const field = req.params.FIELD as keyof Volatilities | undefined
  const date = req.params.DATE
  const range = req.params.RANGE ?? '1M'

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

  const result = await findVolatilities(symbol, duration, field, date)

  //console.log('getVolatilitiesBySymbolAndRange', symbol, range, field, date, result)

  //res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
