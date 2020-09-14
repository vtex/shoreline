import { system } from 'styled-system'

import { theme } from '../theme/theme'

export const spaceTokens = system({
  m: {
    property: 'margin',
    scale: 'space',
  },
  mt: {
    property: 'marginTop',
    scale: 'space',
  },
  mr: {
    property: 'marginRight',
    scale: 'space',
  },
  mb: {
    property: 'marginBottom',
    scale: 'space',
  },
  ml: {
    property: 'marginLeft',
    scale: 'space',
  },
  mx: {
    properties: ['marginLeft', 'marginRight'],
    scale: 'space',
  },
  my: {
    properties: ['marginTop', 'marginBottom'],
    scale: 'space',
  },
  p: {
    property: 'padding',
    scale: 'space',
  },
  pt: {
    property: 'paddingTop',
    scale: 'space',
  },
  pr: {
    property: 'paddingRight',
    scale: 'space',
  },
  pb: {
    property: 'paddingBottom',
    scale: 'space',
  },
  pl: {
    property: 'paddingLeft',
    scale: 'space',
  },
  px: {
    properties: ['paddingLeft', 'paddingRight'],
    scale: 'space',
  },
  py: {
    properties: ['paddingTop', 'paddingBottom'],
    scale: 'space',
  },
})

type Space = keyof typeof theme.space

export interface SpaceTokensProps {
  /**
   * Margin
   */
  m?: Space
  /**
   * Margin top
   */
  mt?: Space
  /**
   * Margin right
   */
  mr?: Space
  /**
   * Margin bottom
   */
  mb?: Space
  /**
   * Margin left
   */
  ml?: Space
  /**
   * Horizontal margin
   */
  mx?: Space
  /**
   * Vertical margin
   */
  my?: Space
  /**
   * Padding
   */
  p?: Space
  /**
   * Padding top
   */
  pt?: Space
  /**
   * Padding right
   */
  pr?: Space
  /**
   * Padding bottom
   */
  pb?: Space
  /**
   * Padding left
   */
  pl?: Space
  /**
   * Horizontal padding
   */
  px?: Space
  /**
   * Vertical padding
   */
  py?: Space
}
