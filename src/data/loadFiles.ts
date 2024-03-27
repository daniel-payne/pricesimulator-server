import type { Markets } from '../types/Markets'
import runSQL from './utilities/database'

export default async function loadFiles() {
  return (await runSQL(
    `SELECT 
        M.symbol                             as symbol, 
        M.name                               as name, 
        REPLACE(LOWER(M.category), ' ', '')  as category,
        MAX(F.path)                          as path
     FROM 
       markets M
     JOIN
       files F ON F.symbol = M.symbol
     GROUP BY
       M.symbol, 
       M.name, 
       M.Category
     ORDER BY 
       M.symbol;`,
  )) as Markets
}
