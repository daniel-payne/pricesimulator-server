import sqlite3 from 'sqlite3'

import cache from './cache'

const PATH = '../../../Financial Data/index.db'

const db = new sqlite3.Database(PATH, sqlite3.OPEN_READONLY)

console.log('DATABASE connected', PATH)

export default function runSQL(sql: string, params: any[] = [], useCache = true): Promise<Array<any> | undefined> {
  const key = `${sql} [${params.join(',')}]`

  if (useCache) {
    if (cache.has(key)) {
      console.log('CACHE --> SQL') //, key);

      return Promise.resolve(cache.get(key))
    }
  }

  return new Promise((resolve, reject) => {
    db.all(sql, params, function (err, rows) {
      if (err) {
        return reject(err)
      }

      if (useCache) {
        console.log('CACHE <-- SQL') //, key);

        cache.set(key, rows)
      }
      resolve(rows)
    })
  })
}
