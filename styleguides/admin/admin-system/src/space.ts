import { system, ResponsiveValue } from 'styled-system'

import { Space } from './theme/config'

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

export interface SpaceTokensProps {
  /**
   * Margin
   */
  m?: ResponsiveValue<Space | 'auto'>
  /**
   * Margin top
   */
  mt?: ResponsiveValue<Space>
  /**
   * Margin right
   */
  mr?: ResponsiveValue<Space>
  /**
   * Margin bottom
   */
  mb?: ResponsiveValue<Space>
  /**
   * Margin left
   */
  ml?: ResponsiveValue<Space>
  /**
   * Horizontal margin
   */
  mx?: ResponsiveValue<Space>
  /**
   * Vertical margin
   */
  my?: ResponsiveValue<Space>
  /**
   * Padding
   */
  p?: ResponsiveValue<Space>
  /**
   * Padding top
   */
  pt?: ResponsiveValue<Space>
  /**
   * Padding right
   */
  pr?: ResponsiveValue<Space>
  /**
   * Padding bottom
   */
  pb?: ResponsiveValue<Space>
  /**
   * Padding left
   */
  pl?: ResponsiveValue<Space>
  /**
   * Horizontal padding
   */
  px?: ResponsiveValue<Space>
  /**
   * Vertical padding
   */
  py?: ResponsiveValue<Space>
}
