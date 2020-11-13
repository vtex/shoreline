const palette = {
  base: {
    bg: 'background',
    color: 'text.primary',
  },
  inverted: {
    bg: 'text.primary',
    color: 'background',
  },
  primary: {
    bg: 'primary.base',
    color: 'primary.accent',
  },
  'primary-washed': {
    bg: 'secondary',
    color: 'primary.base',
  },
  danger: {
    bg: 'danger.base',
    color: 'danger.accent',
  },
  'danger-washed': {
    bg: 'danger.washed.base',
    color: 'danger.base',
  },
  success: {
    bg: 'success.base',
    color: 'success.accent',
  },
  'success-washed': {
    bg: 'success.washed.base',
    color: 'success.base',
  },
  warning: {
    bg: 'warning.base',
    color: 'warning.accent',
  },
  'warning-washed': {
    bg: 'warning.washed.base',
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
