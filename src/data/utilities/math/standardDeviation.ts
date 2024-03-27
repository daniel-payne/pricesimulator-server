export default function standardDeviation(array: number[]) {
  if (array.length < 2) {
    return undefined
  }

  const n = array.length
  const mean = array.reduce((a, b) => a + b) / n

  return Math.sqrt(array.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / (n - 1))
}
