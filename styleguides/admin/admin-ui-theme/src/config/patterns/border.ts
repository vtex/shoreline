const borderStyles = {
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: 'default',
}

const border = {
  default: {
    ...borderStyles,
    borderColor: 'muted.3',
  },
  'divider-bottom': {
    borderBottomWidth: '1px',
    borderBottomStyle: 'solid',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderColor: 'muted.3',
  },
  'divider-top': {
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderColor: 'muted.3',
  },
  strong: {
    ...borderStyles,
    borderColor: 'text',
  },
  disabled: {
    ...borderStyles,
    borderColor: 'muted.2',
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
   * @see ...border-pattern-documentation
   */
  border?: keyof typeof border
}

export { border }
