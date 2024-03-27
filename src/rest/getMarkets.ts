import type { Express, Request, Response, NextFunction } from 'express'

import findMarkets from '../data/findMarkets'

const ONE_HOUR = 60 * 60 * 1000

export default async function getMarkets(req: Request, res: Response, next: NextFunction) {
  const result = await findMarkets()

  //console.log('getMarkets', markets?.length)

  res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
