import calculateVolatilities from './calculateVolatilities'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Volatilities } from '../types/Volatilities'

export default async function findVolatilities(symbol: string, duration: number, fields?: string, date?: string | number) {
  const result: any = {}

  const volatilities = await calculateVolatilities(symbol, duration)

  let properties = []
  let index = -1

  if (fields == null || fields?.toUpperCase() === 'ALL') {
    properties = [
      'timestamps',
      'overnightVolatilities',
      'parkinsonVolatilities',
      'rogersSatchellVolatilities',
      'garminKlassVolatilities',
      'yangZhangVolatilities',
    ]
  } else {
    properties = fields.split(',')
  }

  if (date) {
    const match = Number.isInteger(date) ? date : new Date(date).getTime()

    index = searchArrayForMatch(volatilities.timestamps, match)
  }

  for (const property of properties) {
    const data = volatilities[property as keyof Volatilities]

    const item = index > -1 ? [data[index]] : data

    result[property as keyof Volatilities] = item
  }

  //console.log('findVolatilities', symbol, duration, fields, date, index, properties)

  return result
}
