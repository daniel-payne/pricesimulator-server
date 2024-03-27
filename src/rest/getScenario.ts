import type { Express, Request, Response, NextFunction } from 'express'

import findScenario from '../data/findScenario'

const ONE_HOUR = 60 * 60 * 1000

export default async function getMarket(req: Request, res: Response, next: NextFunction) {
  const id = req.params.ID

  const result = await findScenario(id)

  //console.log('getMarkets', markets?.length)

  res.set(`Cache-Control', 'public, max-age=${ONE_HOUR}`)

  res.send(result)
}
