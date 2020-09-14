import { system } from 'styled-system'
import * as CSS from 'csstype'

export const colorTokens = system({
  backgroundColor: {
    property: 'backgroundColor',
    scale: 'colors',
  },
  color: {
    property: 'color',
    scale: 'colors',
  },
  borderColor: {
    property: 'borderColor',
    scale: 'colors',
  },
  caretColor: {
    property: 'caretColor',
    scale: 'colors',
  },
  borderTopColor: {
    property: 'borderTopColor',
    scale: 'colors',
  },
  borderBottomColor: {
    property: 'borderBottomColor',
    scale: 'colors',
  },
  borderLeftColor: {
    property: 'borderLeftColor',
    scale: 'colors',
  },
  borderRightColor: {
    property: 'borderRightColor',
    scale: 'colors',
  },
  outlineColor: {
    property: 'outlineColor',
    scale: 'colors',
  },
  fill: {
    property: 'fill',
    scale: 'colors',
  },
  stroke: {
    property: 'stroke',
    scale: 'colors',
  },
})

type Colors =
  | 'text'
  | 'background'
  | 'muted.0'
  | 'muted.1'
  | 'muted.2'
  | 'muted.3'
  | 'muted.4'
  | 'focus'
  | 'primary.base'
  | 'primary.hover'
  | 'primary.active'
  | 'primary.contrast'
  | 'primary.washed'
  | 'danger.base'
  | 'danger.hover'
  | 'danger.active'
  | 'danger.contrast'
  | 'danger.washed'
  | CSS.Property.BackgroundColor

export interface ColorTokensProps {
  backgroundColor?: Colors
  color?: Colors
  borderColor?: Colors
  caretColor?: Colors
  borderTopColor?: Colors
  borderBottomColor?: Colors
  borderLeftColor?: Colors
  borderRightColor?: Colors
  outlineColor?: Colors
  fill?: Colors
  stroke?: Colors
}
