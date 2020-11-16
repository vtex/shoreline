const borderStyles = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: 'default',
}

const border = {
  default: {
    ...borderStyles,
    borderColor: 'muted.2',
  },
  'divider-bottom': {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'muted.2',
  },
  'divider-top': {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'muted.2',
  },
  strong: {
    ...borderStyles,
    borderColor: 'text.primary',
  },
  disabled: {
    ...borderStyles,
    borderColor: 'muted.1',
  },
  primary: {
    ...borderStyles,
    borderColor: 'primary.base',
  },
  danger: {
    ...borderStyles,
    borderColor: 'danger.base',
  },
}

export type BorderPattern = {
  /**
   * @description Sets a border style pattern, customizing the following border properties.
   * - borderStyle
   * - borderWidth
   * - borderColor
   * - borderRadius
   * @example
   * ```jsx
   * <Component border="default"/>
   * ```
   * @default default
   * @see https://admin-ui-docs.vercel.app/docs/guide/patterns/#border
   */
  border?: keyof typeof border
}

export { border }
