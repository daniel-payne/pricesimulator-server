import NodeCache from 'node-cache'

const ONE_DAY = 60 * 60 * 24

const cache = new NodeCache({ stdTTL: ONE_DAY })

console.log('CACHE activated', ONE_DAY)

export default cache
