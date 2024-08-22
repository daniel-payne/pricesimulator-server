import type { Express, Request, Response, NextFunction } from 'express'

import findScenarios from '../data/findScenarios'

//const ONE_HOUR = 60 * 60 * 1000

export default async function getMarket(req: Request, res: Response, next: NextFunction) {
  const result = await findScenarios()

  //console.log('getMarkets', markets?.length)

  //res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
