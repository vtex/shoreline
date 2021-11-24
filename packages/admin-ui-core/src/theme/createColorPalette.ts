interface Param<CP> {
  id: string
  colors: CP
}

export function createColorPalette<CP>(param: Param<CP>): CP {
  return param.colors
}
