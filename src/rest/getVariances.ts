import type { Express, Request, Response, NextFunction } from 'express'

import findVariances from '../data/findVariances'

import type { Variances } from '../types/Variances'

const ONE_HOUR = 60 * 60 * 1000

export default async function getVariances(req: Request, res: Response, next: NextFunction) {
  const symbol = req.params.SYMBOL
  const field = req.params.FIELD as keyof Variances | undefined
  const date = req.params.DATE

  const result = await findVariances(symbol, field, date)

  //console.log('getPricesBySymbol', symbol, field, date, result?.timestamps?.length)

  res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
