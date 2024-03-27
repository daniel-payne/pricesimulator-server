'use server'

import * as Papa from 'papaparse'

import { promises as fs } from 'fs'

import type { Prices } from '../types/Prices'
import openFile from './utilities/openFile'
import type { Market } from '../types/Markets'
import loadFiles from './loadFiles'

const FIRST_PRICE = '1970-01-01'

const NO_PRICES = {
  timestamps: [],
  opens: [],
  highs: [],
  lows: [],
  closes: [],
}

const csvToObjectForPrices = (item: any) => {
  if (!item['<DATE>']) {
    return
  }

  const date = item['<DATE>'].substring(0, 4) + '-' + item['<DATE>'].substring(4, 6) + '-' + item['<DATE>'].substring(6, 8)

  const timestamp = new Date(date).getTime()

  const data = {
    date,
    timestamp,
    open: Number.parseFloat(item['<OPEN>']),
    high: Number.parseFloat(item['<HIGH>']),
    low: Number.parseFloat(item['<LOW>']),
    close: Number.parseFloat(item['<CLOSE>']),
  } as any

  return data
}

const csvParseWithHeaderOptions = {
  header: true,
}

export default async function openPrices(symbol: string): Promise<Prices> {
  const markets = await loadFiles()

  const match = symbol.toUpperCase()

  const market = markets?.find((market: Market) => market.symbol.toUpperCase() === match)

  if (market == null) {
    return NO_PRICES
  }

  let csv

  try {
    csv = await openFile(process.cwd() + '/Financial Data' + market.path)
  } catch {
    return NO_PRICES
  }

  if (csv == null) {
    return NO_PRICES
  }

  const json = Papa.parse(csv, csvParseWithHeaderOptions)

  const prices = json.data
    .map(csvToObjectForPrices)
    .filter((item: any) => item?.open)
    .filter((item) => item.date >= FIRST_PRICE)

  // console.log('openPrices', symbol, prices.length, prices[0])

  return {
    timestamps: prices.map((item: any) => item.timestamp as number),
    opens: prices.map((item: any) => item.open as number),
    highs: prices.map((item: any) => item.high as number),
    lows: prices.map((item: any) => item.low as number),
    closes: prices.map((item: any) => item.close as number),
  } as Prices
}
