export default function average(array: number[]) {
  if (array.length === 0) {
    return undefined
  }

  return array.reduce((p, c) => p + c, 0) / array.length
}
