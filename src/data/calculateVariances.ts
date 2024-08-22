import type { Variances } from '../types/Variances'
import openPrices from './openPrices'
import cache from './utilities/cache'

const PARKINSON_FACTOR = 1 / Math.sqrt(4 * Math.log(2))
const GARMIN_KLASS_FACTOR = 3 * Math.log(2) - 1

export default async function calculateVariances(symbol: string): Promise<Variances> {
  const key = `${symbol}-VARIANCES`

  if (cache.has(key)) {
    console.log('CACHE --> VARIANCES') //, key);
    return cache.get(key) as Variances
  }

  const prices = await openPrices(symbol)

  const timestamps = prices.timestamps

  const length = timestamps.length

  const averageOpenCloses = new Array<number>(length)
  const averageHighLows = new Array<number>(length)

  const percentageCloseYesterdays = new Array<number>(length)
  const percentageOpenCloses = new Array<number>(length)
  const percentageHighLows = new Array<number>(length)

  const logSquaredHighLows = new Array<number>(length)
  const logSquaredCloseOpens = new Array<number>(length)

  const logOpenYesterdays = new Array<number>(length)
  const logHighOpens = new Array<number>(length)
  const logLowOpens = new Array<number>(length)
  const logCloseOpens = new Array<number>(length)

  const garminKlassValues = new Array<number>(length)
  const rogersSatchellValues = new Array<number>(length)

  timestamps.forEach((timestamp, i) => {
    averageOpenCloses[i] = (prices.opens[i] + prices.closes[i]) / 2
    averageHighLows[i] = (prices.highs[i] + prices.lows[i]) / 2

    percentageOpenCloses[i] = prices.opens[i] / prices.closes[i] - 1
    percentageHighLows[i] = prices.highs[i] / prices.lows[i] - 1

    logSquaredHighLows[i] = Math.log(prices.highs[i] / prices.lows[i]) ** 2
    logSquaredCloseOpens[i] = Math.log(prices.closes[i] / prices.opens[i]) ** 2

    logHighOpens[i] = Math.log(prices.highs[i] / prices.opens[i])
    logLowOpens[i] = Math.log(prices.lows[i] / prices.opens[i])
    logCloseOpens[i] = Math.log(prices.closes[i] / prices.opens[i])

    garminKlassValues[i] = logSquaredHighLows[i] * 0.5 + logSquaredCloseOpens[i] * GARMIN_KLASS_FACTOR
    rogersSatchellValues[i] = logHighOpens[i] * (logHighOpens[i] - logCloseOpens[i]) + logLowOpens[i] * (logLowOpens[i] - logCloseOpens[i])

    if (i > 0) {
      percentageCloseYesterdays[i] = prices.closes[i] / prices.closes[i - 1] - 1

      logOpenYesterdays[i] = Math.log(prices.opens[i] / prices.closes[i - 1])
    }
  })

  const result = {
    timestamps,

    averageOpenCloses,
    averageHighLows,

    percentageCloseYesterdays,
    percentageOpenCloses,
    percentageHighLows,

    logSquaredHighLows,
    logSquaredCloseOpens,

    logOpenYesterdays,
    logHighOpens,
    logLowOpens,
    logCloseOpens,

    garminKlassValues,
    rogersSatchellValues,
  } as Variances

  console.log('CACHE <-- VARIANCES') //, key);

  cache.set(key, result)

  return result
}
