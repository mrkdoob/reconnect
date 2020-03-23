// a little function to help us with reordering the result
export function reorder<R>(
  list: R[],
  startIndex: number,
  endIndex: number,
): R[] {
  const result = [...list]
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)
  return result
}
