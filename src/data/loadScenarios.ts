import type { Markets } from '../types/Markets'
import runSQL from './utilities/database'

export default async function loadScenarios(id?: string) {
  return [
    {
      id: '1',
      name: 'Buy and sell cows',
      description: `Sell something you don't own and buy something you don't want to keep`,

      symbols: ['LC.F'],

      contractTypeSettings: {
        options: ['BUY-UNDERLYING', 'SELL-UNDERLYING'],
      },
      contractNotionalSettings: {
        isTradingContracts: true,
        isReadonly: true,
        defaultValue: 1,
      },

      canUseStopLoss: false,
      canUseTakeProfit: false,
      canCoverTrade: false,
    },

    {
      id: '2',
      name: 'Trade in more markets',
      description: `You can trade more than one market, and you don't even need to buy a whole contract`,

      symbols: ['FC.F', 'LC.F', 'LH.F'],

      contractTypeSettings: {
        options: ['BUY-UNDERLYING', 'SELL-UNDERLYING'],
      },
      contractNotionalSettings: {
        isTradingContracts: true,
        isReadonly: false,
        defaultValue: 1,
      },

      canUseStopLoss: false,
      canUseTakeProfit: false,
      canCoverTrade: false,
    },

    {
      id: '3',
      name: 'Trade in lots markets',
      description: `Practice trading your contracts in lots of different markets.`,

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
      ],

      contractTypeSettings: {
        options: ['BUY-UNDERLYING', 'SELL-UNDERLYING'],
      },
      contractNotionalSettings: {
        isTradingContracts: true,
        isReadonly: false,
        defaultValue: 1,
      },

      canUseStopLoss: false,
      canUseTakeProfit: false,
      canCoverTrade: false,
    },

    {
      id: '4',
      name: 'Fire and Forget',
      description: `Set limits and let you trade run until it's made or lost money`,

      symbols: ['KC.F'],

      contractTypeSettings: {
        options: ['BUY-UNDERLYING', 'SELL-UNDERLYING'],
      },
      contractNotionalSettings: {
        isTradingContracts: false,
        isReadonly: false,
        defaultValue: 1000,
      },

      canUseStopLoss: true,
      canUseTakeProfit: true,
      canCoverTrade: false,
    },

    {
      id: '5',
      name: 'Spread your wings',
      description: `Now you have the hang of it, lets add in currencies and metals`,

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
      ],

      contractTypeSettings: {
        options: ['BUY-UNDERLYING', 'SELL-UNDERLYING'],
      },
      contractNotionalSettings: {
        isTradingContracts: false,
        isReadonly: false,
        defaultValue: 1000,
      },

      canUseStopLoss: true,
      canUseTakeProfit: true,
      canCoverTrade: false,
    },

    {
      id: '9',
      name: 'All strategies available',
      description: `everything is available`,

      canCallUnderlying: true,
      canPutUnderlying: true,
      canSellOptions: true,
      canBuyOptions: true,

      isTradingContracts: false,

      canUseStopLoss: true,
      canUseTakeProfit: true,
      canCoverTrade: true,
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
