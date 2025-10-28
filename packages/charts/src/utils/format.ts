/**
 * Abbreviates large numbers. For example:
 * - 100.000 = 100K
 * - 1.000.000 = 1M
 * - 1.000.000.000 = 1B
 */
export const compactNumber = (number: number) => {
  const formatter = new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  })

  return formatter.format(number)
}
