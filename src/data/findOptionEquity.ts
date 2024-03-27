import calculateOption from './calculateOption'
import calculateGreeks from './calculateGreeks'
import findRates from './findRates'
import findPrices from './findPrices'
import findVolatilities from './findVolatilities'

export default async function findOptionEquity(
  symbol: string,
  type: string,
  range: number,
  date: string | number,
  strikePrice: number,
  spotPrice: number,
  volatility: number,
) {
  const interestRates = await findRates(symbol, range, date)
  const rates = interestRates.opens
  const interestRate = rates?.length ? rates[0] : undefined

  let option
  let greeks

  option = await calculateOption(spotPrice, strikePrice, range, volatility, interestRate, type)

  if (type.toUpperCase() === 'EUROPEAN') {
    greeks = await calculateGreeks(spotPrice, strikePrice, range, volatility, interestRate)
  }

  // option = await calculateOption(1.077716, 1.0771, 20, 0.05986, 0.0525 - 0.045)
  // greeks = await calculateGreeks(1.077716, 1.0771, 20, 0.05986, 0.045, 0.0525)

  // notional/spot*price

  const result = {
    spotPrice,
    interestRate,
    volatility,
    greeks,
    option,
  }

  // console.log(result)

  return result
}
