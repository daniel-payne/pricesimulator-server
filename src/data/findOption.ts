import calculateOption from './calculateOption'
import calculateGreeks from './calculateGreeks'
import findRates from './findRates'
import findPrices from './findPrices'
import findVolatilities from './findVolatilities'
import findOptionEquity from './findOptionEquity'
import findMarkets from './findMarkets'
import findOptionCurrency from './findOptionCurrency'

export default async function findOption(symbol: string, type: string, range: number, date: string | number, strikePrice: number) {
  const prices = await findPrices(symbol, 'all', date)

  const markets = await findMarkets('CURRENCY')

  const isCurrencyPair = markets.currency.some((currency: any) => currency.symbol === symbol)

  if (prices.noData) {
    return
  }

  const volatilities = await findVolatilities(symbol, range, 'all', date)

  const highs = prices.highs
  const lows = prices.lows
  const yangZhangs = volatilities.yangZhangVolatilities
  const garminKlass = volatilities.garminKlassVolatilities

  const high = highs?.length ? highs[0] : undefined
  const low = lows?.length ? lows[0] : undefined

  const spotPrice = low + (high - low) * Math.random()
  const volatility = yangZhangs?.length && yangZhangs[0] ? yangZhangs[0] : garminKlass[0]

  let result

  if (isCurrencyPair) {
    result = await findOptionCurrency(symbol, type, range, date, strikePrice, spotPrice, volatility)
  } else {
    result = await findOptionEquity(symbol, type, range, date, strikePrice, spotPrice, volatility)
  }

  return result
}
