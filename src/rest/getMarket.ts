import type { Express, Request, Response, NextFunction } from 'express'

import findMarket from '../data/findMarket'

const ONE_HOUR = 60 * 60 * 1000

export default async function getMarket(req: Request, res: Response, next: NextFunction) {
  const symbol = req.params.SYMBOL

  const result = await findMarket(symbol)

  //console.log('getMarkets', markets?.length)

  res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
