import calculateVariances from './calculateVariances'
import searchArrayForMatch from './utilities/search/binarySearch'

import type { Variances } from '../types/Variances'

export default async function findVariances(symbol: string, fields?: string, date?: string | number) {
  const result: any = {}

  const variances = await calculateVariances(symbol)

  let properties = []
  let index = -1

  if (fields == null || fields?.toUpperCase() === 'ALL') {
    properties = [
      'timestamps',
      'averageOpenCloses',
      'averageHighLows',
      'percentageCloseYesterdays',
      'percentageOpenCloses',
      'percentageHighLows',
      'logSquaredHighLows',
      'logSquaredCloseOpens',
      'logOpenYesterdays',
      'logHighOpens',
      'logLowOpens',
      'logCloseOpens',
      'garminKlassValues',
      'rogersSatchellValues',
    ]
  } else {
    properties = fields.split(',')
  }

  if (date) {
    const match = Number.isInteger(date) ? date : new Date(date).getTime()

    index = searchArrayForMatch(variances.timestamps, match)
  }

  for (const property of properties) {
    const data = variances[property as keyof Variances]

    const item = index > -1 ? [data[index]] : data

    result[property as keyof Variances] = item
  }

  return result
}

// import calculateVariances from './calculateVariances'
// import searchArrayForMatch from './utilities/search/binarySearch'

// import type { Variances } from '../types/Variances'

// export default async function findVariances(symbol: string, date: string | number, field = 'ALL') {
//   const result: any = { symbol, date }

//   const match = Number.isInteger(date) ? date : new Date(date).getTime()

//   if (symbol && match) {
//     const variances = await calculateVariances(symbol)

//     const index = searchArrayForMatch(variances.timestamps, match)

//     if (index > -1) {
//       let fields = []

//       if (field == null || field?.toUpperCase() === 'ALL') {
//         fields = [
//           'timestamps',
//           'averageOpenCloses',
//           'averageHighLows',
//           'percentageCloseYesterdays',
//           'percentageOpenCloses',
//           'percentageHighLows',
//           'logSquaredHighLows',
//           'logSquaredCloseOpens',
//           'logOpenYesterdays',
//           'logHighOpens',
//           'logLowOpens',
//           'logCloseOpens',
//           'garminKlassValues',
//           'rogersSatchellValues',
//         ]
//       } else {
//         fields = [field]
//       }

//       for (const match of fields) {
//         const data = variances[match as keyof Variances]

//         const item = data[index]

//         result[match as keyof Variances] = item
//       }
//     }
//   }

//   return result
// }
