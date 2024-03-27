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
  const baseCurrency = symbol.slice(0, 3)
  const termCurrency = symbol.slice(3, 6)

  const baseInterestRates = await findRates(baseCurrency, range, date)
  const termInterestRates = await findRates(termCurrency, range, date)

  const baseRates = baseInterestRates.opens
  const termRates = termInterestRates.opens

  const baseInterestRate = baseRates?.length ? baseRates[0] : undefined
  const termInterestRate = termRates?.length ? termRates[0] : undefined

  const differentialRate = baseInterestRate - termInterestRate

  let option
  let greeks

  option = await calculateOption(spotPrice, strikePrice, range, volatility, differentialRate, type)

  if (type.toUpperCase() === 'EUROPEAN') {
    greeks = await calculateGreeks(spotPrice, strikePrice, range, volatility, termInterestRate, baseInterestRate)
  }

  // option = await calculateOption(1.077716, 1.0771, 20, 0.05986, 0.0525 - 0.045)
  // greeks = await calculateGreeks(1.077716, 1.0771, 20, 0.05986, 0.045, 0.0525)

  // option = await calculateOption(1.10463, 1.10488, 20, 0.002283, 1.66775 - -0.455)
  // greeks = await calculateGreeks(1.10463, 1.10438, 20, 0.002283, 1.66775, -0.455)

  // notional/spot*price

  const result = {
    spotPrice,
    strikePrice,
    baseInterestRate,
    termInterestRate,
    differentialRate,
    volatility,
    greeks,
    option,
  }

  // console.log(result)

  return result
}
