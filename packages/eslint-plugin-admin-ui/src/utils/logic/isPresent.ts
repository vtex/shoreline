export const isPresent = <T>(value: T): value is Exclude<T, null> =>
  value !== null
