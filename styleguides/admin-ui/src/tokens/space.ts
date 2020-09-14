import { system } from 'styled-system'

import { theme } from '../theme/theme'

export const spaceTokens = system({
  margin: {
    property: 'margin',
    scale: 'space',
  },
  marginTop: {
    property: 'marginTop',
    scale: 'space',
  },
  marginRight: {
    property: 'marginRight',
    scale: 'space',
  },
  marginBottom: {
    property: 'marginBottom',
    scale: 'space',
  },
  marginLeft: {
    property: 'marginLeft',
    scale: 'space',
  },
  marginX: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
  },
  marginY: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
  },
  padding: {
    property: 'padding',
    scale: 'space',
  },
  paddingTop: {
    property: 'paddingTop',
    scale: 'space',
  },
  paddingRight: {
    property: 'paddingRight',
    scale: 'space',
  },
  paddingBottom: {
    property: 'paddingBottom',
    scale: 'space',
  },
  paddingLeft: {
    property: 'paddingLeft',
    scale: 'space',
  },
  paddingX: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  paddingY: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
})

type Space = keyof typeof theme.space

export interface SpaceTokensProps {
  margin?: Space
  marginTop?: Space
  marginRight?: Space
  marginBottom?: Space
  marginLeft?: Space
  marginX?: Space
  marginY?: Space
  padding?: Space
  paddingTop?: Space
  paddingRight?: Space
  paddingBottom?: Space
  paddingLeft?: Space
  paddingX?: Space
  paddingY?: Space
}
