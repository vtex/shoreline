export default function get<T = any>(
  value: any,
  path: string,
  defaultValue: T
): T {
  return String(path)
    .split('.')
    .reduce((acc, v) => {
      try {
        // @ts-ignore
        acc = acc[v]
      } catch (e) {
        return defaultValue
      }
      return acc
    }, value)
}
