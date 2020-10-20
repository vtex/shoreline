import { SxStyleProp } from '@theme-ui/core'

export { SxStyleProp, Theme } from '@theme-ui/core'

export type PropsWithStyles<P> = P & {
  styles?: SxStyleProp
}
