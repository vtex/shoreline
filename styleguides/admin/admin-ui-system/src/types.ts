import { StyleProp } from './styles'

export type WithStyles<P> = P & {
  styles?: StyleProp
}

export type ResponsiveValue<T> = T | T[]
