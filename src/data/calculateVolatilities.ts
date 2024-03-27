import type { Volatilities } from '../types/Volatilities'
import calculateVariances from './calculateVariances'

import cache from './utilities/cache'
import average from './utilities/math/average'
import standardDeviation from './utilities/math/standardDeviation'

const PARKINSON_FACTOR = 1 / Math.sqrt(4 * Math.log(2))
const GARMIN_KLASS_FACTOR = 3 * Math.log(2) - 1

export default async function calculateVolatilities(symbol: string, duration: number): Promise<Volatilities> {
  const key = `${symbol}-${duration}-VOLATILITIES`

  if (cache.has(key)) {
    console.log('CACHE --> VOLATILITIES', symbol, duration)
    return cache.get(key) as Volatilities
  }

  const variances = await calculateVariances(symbol)

  const {
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
  } = variances

  const length = timestamps.length

  const overnightVolatilities = new Array<number>(length)
  const parkinsonVolatilities = new Array<number>(length)
  const rogersSatchellVolatilities = new Array<number>(length)
  const garminKlassVolatilities = new Array<number>(length)
  const yangZhangVolatilities = new Array<number>(length)

  timestamps.forEach((_, i) => {
    if (i > duration + 1) {
      const yangZhangFactor = 0.34 / (1.34 + (duration + 1) / (duration - 1))

      const percentageCloseYesterdaysSlice = percentageCloseYesterdays.slice(i - duration, i)
      const logSquaredHighLowsSlice = logSquaredHighLows.slice(i - duration, i)
      const garminKlassValuesSlice = garminKlassValues.slice(i - duration, i)

      const logOpenYesterdaysSlice = logOpenYesterdays.slice(i - duration, i)
      const logCloseOpensSlice = logCloseOpens.slice(i - duration, i)

      const rogersSatchellValuesSlice = rogersSatchellValues.slice(i - duration, i)

      const averageLogSquaredHighLowsSlice = average(logSquaredHighLowsSlice)
      const averageGarminKlassValuesSlice = average(garminKlassValuesSlice)
      const averageRogersSatchellValuesSlice = average(rogersSatchellValuesSlice)

      const standardDeviationPercentageCloseYesterdaysSlice = standardDeviation(percentageCloseYesterdaysSlice)
      const standardDeviationLogOpenYesterdaysSlice = standardDeviation(logOpenYesterdaysSlice)
      const standardDeviationLogCloseOpensSlice = standardDeviation(logCloseOpensSlice)

      if (standardDeviationPercentageCloseYesterdaysSlice) {
        overnightVolatilities[i] = standardDeviationPercentageCloseYesterdaysSlice
      }

      if (averageLogSquaredHighLowsSlice) {
        parkinsonVolatilities[i] = Math.sqrt(averageLogSquaredHighLowsSlice * PARKINSON_FACTOR)
      }

      if (averageGarminKlassValuesSlice) {
        garminKlassVolatilities[i] = Math.sqrt(averageGarminKlassValuesSlice)
      }

      if (averageRogersSatchellValuesSlice) {
        rogersSatchellVolatilities[i] = Math.sqrt(averageRogersSatchellValuesSlice)
      }

      if (standardDeviationLogOpenYesterdaysSlice && standardDeviationLogCloseOpensSlice && rogersSatchellVolatilities[i]) {
        yangZhangVolatilities[i] = Math.sqrt(
          standardDeviationLogOpenYesterdaysSlice ** 2 +
            (yangZhangFactor * standardDeviationLogCloseOpensSlice) ** 2 +
            (1 - yangZhangFactor) * rogersSatchellVolatilities[i] ** 2,
        )
      }
    }
  })

  const result = {
    timestamps,

    overnightVolatilities,
    parkinsonVolatilities,
    rogersSatchellVolatilities,
    garminKlassVolatilities,
    yangZhangVolatilities,
  } as Volatilities

  console.log('CACHE <-- VOLATILITIES', symbol, duration)

  cache.set(key, result)

  return result
}
