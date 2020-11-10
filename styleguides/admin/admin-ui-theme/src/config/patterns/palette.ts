const palette = {
  base: {
    bg: 'background',
    color: 'text',
  },
  inverted: {
    bg: 'text',
    color: 'background',
  },
  primary: {
    bg: 'primary.base',
    color: 'primary.contrast',
  },
  'primary-washed': {
    bg: 'primary.washed.0',
    color: 'primary.base',
  },
  danger: {
    bg: 'danger.base',
    color: 'danger.contrast',
  },
  'danger-washed': {
    bg: 'danger.washed.0',
    color: 'danger.base',
  },
  success: {
    bg: 'success.base',
    color: 'success.contrast',
  },
  'success-washed': {
    bg: 'success.washed.0',
    color: 'success.base',
  },
  warning: {
    bg: 'warning.base',
    color: 'warning.contrast',
  },
  'warning-washed': {
    bg: 'warning.washed.0',
    color: 'warning.base',
  },
}

export { palette }

export type PalettePattern = {
  /**
   * @description Sets a color palette style pattern, customizing the following color properties.
   * - backgroundColor
   * - color
   * @example
   * ```jsx
   * <Component palette="base"/>
   * ```
   * @default base
   * @see https://admin-ui-docs.vercel.app/docs/guide/patterns/#palette
   */
  palette?: keyof typeof palette
}
