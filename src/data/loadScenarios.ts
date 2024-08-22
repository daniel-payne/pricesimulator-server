import type { Markets } from '../types/Markets'
import runSQL from './utilities/database'

export default async function loadScenarios(id?: string) {
  return [
    {
      code: 'one',
      name: 'Buy and sell cows',
      description: `Sell something you don't own and buy something you don't want to keep`,

      displayOrder: 1,
      isActive: true,

      symbols: 'LC.F',

      settings: 'display=trade-form&trade=contract-single',
    },

    {
      code: 'two',
      name: 'Trade in more markets',
      description: `You can trade more than one market, and you don't even need to buy a whole contract`,

      displayOrder: 2,

      symbols: 'LH.F,OJ.F,S.F,KW.F',
      settings: 'display=trade-form&trade=contract-multi',
    },

    {
      code: 'two',
      name: 'Trade in more markets',
      description: `You can trade in dollars instead of contracts`,

      displayOrder: 2,

      symbols: 'LH.F,OJ.F,S.F,KW.F',
      settings: 'display=trade-form&trade=dollar-only',
    },

    {
      code: 'three',
      name: 'Trade in lots markets',
      description: `Practice trading your contracts in lots of different markets.`,

      displayOrder: 3,

      symbols: [
        'FC.F',
        'LC.F',
        'LH.F',
        'KC.F',
        'W.F',
        'SB.F',
        'SM.F',
        'RS.F',
        'CA_C.F',
        'GC.F',
        'PA.F',
        'PL.F',
        'SI.F',
        'EURUSD',
        'GBPUSD',
        'CADUSD',
        'CHFUSD',
        'DKKUSD',
        'MXNUSD',
        'SGDUSD',
        'TRYUSD',
        'ZARUSD',
      ].join(','),

      settings: 'display=trade-action&trade=stop-take',
    },

    {
      code: 'four',
      name: 'Fire and Forget',
      description: `Set limits and let you trade run until it's made or lost money`,

      displayOrder: 4,

      symbols: 'KC.F',

      settings: 'display=trade-action&trade=stop-take',
    },

    {
      code: 'five',
      name: 'Spread your wings',
      description: `Now you have the hang of it, lets add in currencies and metals`,

      displayOrder: 5,

      symbols: [
        'FC.F',
        'LC.F',
        'LH.F',
        'KC.F',
        'W.F',
        'SB.F',
        'SM.F',
        'RS.F',
        'CA_C.F',
        'GC.F',
        'PA.F',
        'PL.F',
        'SI.F',
        'EURUSD',
        'GBPUSD',
        'CADUSD',
        'CHFUSD',
        'DKKUSD',
        'MXNUSD',
        'SGDUSD',
        'TRYUSD',
        'ZARUSD',
      ].join(','),

      settings: '',
    },
  ]
}

//   return (await runSQL(
//     `SELECT
//        M.symbol                             as symbol,
//        M.name                               as name,
//        REPLACE(LOWER(M.category), ' ', '')  as category,
//        M.ContractName                       as contractName,
//        M.CashName                           as cashName,
//        M.BaseName                           as baseName,
//        M.TermsName                          as termsName,
//        M.BaseSymbol                         as baseSymbol,
//        M.TermsSymbol                        as termsSymbol,
//        M.BaseCurrency                       as baseCurrency,
//        M.TermsCurrency                      as termsCurrency,
//        M.ContractMultiplier                 as contractMultiplier,
//        M.PriceMultiplier                    as priceMultiplier,
//        M.ContractUnit                       as contractUnit,
//        M.NotionalUnit                       as notionalUnit
//      FROM
//        markets M
//      WHERE
//        M.symbol = :SYMBOL;`,
//     [symbol],
//   )) as unknown as Markets
// }
