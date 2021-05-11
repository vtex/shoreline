export function callOrReturn<T, P>(value: T, param: P) {
  return typeof value === 'function' ? value(param) : value
}
