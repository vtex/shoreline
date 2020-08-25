/* eslint-disable @typescript-eslint/no-explicit-any */
export default function get<T = any>(
  value: any,
  path: string,
  defaultValue: T
): T {
  return String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        acc = acc[v]
      } catch (e) {
        return defaultValue
      }

      return acc
    }, value)
}
