// sudo kill -9 `sudo lsof -t -i:4000`
import type { Express, Request, Response, NextFunction } from 'express'

import cache from '../data/utilities/cache'

import getMarkets from './getMarkets'
import getPrices from './getPrices'
import getVariances from './getVariances'
import getVolatilities from './getVolatilities'
import getRates from './getRates'
import getOption from './getOption'
import getMarket from './getMarket'
import getScenario from './getScenario'
import getScenarios from './getScenarios'

// prettier-ignore
const setup = [
  { path: "/rest/scenarios",                                                      handler: getScenarios},
  { path: "/rest/scenarios/:ID",                                                  handler: getScenario},

  { path: "/rest/markets",                                                        handler: getMarkets},
  { path: "/rest/markets/:SYMBOL",                                                handler: getMarket},
  
  { path: "/rest/prices/:SYMBOL",                                                 handler: getPrices},
  { path: "/rest/prices/:SYMBOL/:FIELD",                                          handler: getPrices},
  { path: "/rest/prices/:SYMBOL/:FIELD/:DATE",                                    handler: getPrices},
          
  { path: "/rest/variances/:SYMBOL",                                              handler: getVariances},
  { path: "/rest/variances/:SYMBOL/:FIELD",                                       handler: getVariances},
  { path: "/rest/variances/:SYMBOL/:FIELD/:DATE",                                 handler: getVariances},
          
  { path: "/rest/volatilities/:SYMBOL/:RANGE",                                    handler: getVolatilities},
  { path: "/rest/volatilities/:SYMBOL/:RANGE/:FIELD",                             handler: getVolatilities},
  { path: "/rest/volatilities/:SYMBOL/:RANGE/:FIELD/:DATE",                       handler: getVolatilities},

  { path: "/rest/rates",                                                          handler: getRates},
  { path: "/rest/rates/:CURRENCY/:RANGE",                                         handler: getRates},
  { path: "/rest/rates/:CURRENCY/:RANGE/:DATE",                                   handler: getRates},

  // { path: "/rest/spots/:SYMBOL/spot",                                             handler: getSpot},
  { path: "/rest/options/:SYMBOL/:TYPE/:RANGE/:DATE/:STRIKE",                     handler: getOption},

  { path: "/rest/cache/status",                                                   handler: cacheStatus},
  { path: "/rest/cache/clear",                                                    handler: cacheClear},
];

function setPath(input: string) {
  let result = input
    .replace(':SYMBOL', '^SPX')
    .replace(':RANGE', '20')
    .replace(':CATEGORY', 'indices')
    .replace(':FIELD', 'all')
    .replace(':DATE', '2000-02-03')
    .replace(':NOTIONAL', '1000000')
    .replace(':TYPE', 'european')
    .replace(':CURRENCY', 'usd')
    .replace(':STRIKE', '1390')

  return result
}

function setLabel(input: string) {
  return input.replace('/rest/', '')
}

function cacheStatus(req: Request, res: Response, next: NextFunction) {
  const oldStats = cache.getStats()

  res.send(cache.getStats())
}

function cacheClear(req: Request, res: Response, next: NextFunction) {
  cache.flushAll()

  console.log('CACHE cleared')
  res.send({ status: 'OK', message: 'Cache cleared successfully.' })
}

function TBD(req: Request, res: Response, next: NextFunction) {
  res.send(`
  <h3>TO BR DONE</h3>
  <a href="/rest">REST Index</a>
  <pre>${JSON.stringify(req.params, null, 2)}</pre>
  <pre>${JSON.stringify(req.query, null, 2)}</pre>
  <pre>${JSON.stringify(req.body, null, 2)}</pre>
`)
}

function routePlan(req: Request, res: Response, next: NextFunction) {
  const htmlStart = '<div>'
  const htmlEnd = '</div>'

  const html =
    htmlStart +
    setup
      .map(
        (route) =>
          `<div style=""><a href="${setPath(route.path)}">
            ${setLabel(route.path)}
          </a></div>`,
      )
      .join('<br>') +
    htmlEnd

  res.send(html)
}

export default function routes(app: Express) {
  for (const route of setup) {
    app.get(route.path, route.handler)
  }

  app.get('/rest', routePlan)
}
