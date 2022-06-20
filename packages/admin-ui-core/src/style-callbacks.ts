const styleCallbackSymbol = Symbol('styleCallbackSymbol')

export function isStyleCallback(entry: any) {
  if (typeof entry !== 'object') return false

  return !!entry[styleCallbackSymbol]
}

export function negative(token: string) {
  return {
    [styleCallbackSymbol]: true,
    token,
    callback: (resolved: string | number) => `-${resolved}`,
  }
}
