import type { Markets } from '../types/Markets'
import runSQL from './utilities/database'

export default async function loadMarkets(symbol?: string) {
  if (symbol) {
    return (await runSQL(
      `SELECT 
          M.symbol                             as symbol, 
          M.name                               as name, 
          REPLACE(LOWER(M.category), ' ', '')  as category,
          M.Market                             as market, 
          M.Country                            as country, 
          M.Description                        as description, 
          M.Code                               as code, 
          M.PriceModifier                      as priceModifier, 
          M.PriceSize                          as priceSize, 
          M.PriceSpread                        as priceSpread,
          M.PriceDecimals                      as priceDecimals,
          M.ContractSize                       as contractSize, 
          M.ContractUnit                       as contractUnit, 
          M.ContractName                       as contractName, 
          M.BaseSymbol                         as baseSymbol
      FROM        
          markets M
       WHERE        
          M.symbol = :SYMBOL
       AND
          REPLACE(LOWER(M.Category), ' ', '') NOT IN ('equity', 'macroeconomics', 'moneymarket');`,
      [symbol],
    )) as unknown as Markets
  } else {
    return (await runSQL(
      `SELECT 
        M.symbol                             as symbol, 
        M.name                               as name, 
        REPLACE(LOWER(M.category), ' ', '')  as category,
        M.Market                             as market, 
        M.Country                            as country, 
        M.Description                        as description, 
        M.Code                               as code, 
        M.PriceModifier                      as priceModifier, 
        M.PriceSize                          as priceSize, 
        M.PriceSpread                        as priceSpread,
        M.PriceDecimals                      as priceDecimals,
        M.ContractSize                       as contractSize, 
        M.ContractUnit                       as contractUnit, 
        M.ContractName                       as contractName, 
        M.BaseSymbol                         as baseSymbol 
      FROM        
        markets M
      WHERE
          REPLACE(LOWER(M.Category), ' ', '') NOT IN ('equity', 'macroeconomics', 'moneymarket');`,
      [symbol],
    )) as unknown as Markets
  }
}
