import { SxStyleProp } from '@theme-ui/core'

export { SxStyleProp, Theme } from '@theme-ui/core'

export type WithStyles<P> = P & {
  styles?: SxStyleProp
}

export type ResponsiveValue<T> = T | T[]
