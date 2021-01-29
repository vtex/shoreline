const styles = {
  paddingX: 5,
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
  borderWidth: 1,
  borderStyle: 'solid',
  borderRadius: 3,
}

const inputBase = {
  border: 'none',
  borderRadius: 0,
  width: 'fit-content',
  p: 0,
  ':focus': {
    outline: 'none',
  },
}

const size = {
  regular: {
    height: 56,
    input: {
      ...inputBase,
      lineHeight: '24px',
      marginTop: 4,
      fontSize: '18px',
    },
  },
  large: {
    height: 72,
    input: {
      ...inputBase,
      lineHeight: '32px',
      marginTop: '18px',
      fontSize: '22px',
    },
  },
}

const focusBase = {
  borderColor: 'secondary.hover',
  boxShadow: (t: any) => `0 0 0 ${t.borderWidths[1]}px ${t.colors.focus}`,
  outline: 'none',
}

const state = {
  default: {
    borderColor: 'muted.1',
    color: 'secondary.base',
    ':hover': {
      borderColor: 'secondary.hover',
      cursor: 'text',
    },
    ':focus-within': focusBase,
  },
  disabled: {
    backgroundColor: 'muted.3',
    borderColor: 'muted.1',
    color: 'muted.1',
    ':hover': {
      cursor: 'not-allowed',
    },
    label: {
      color: 'muted.1',
    },
    svg: {
      color: 'muted.1',
    },
  },
  error: {
    borderColor: 'danger.base',
    color: 'secondary.base',
    ':hover': {
      borderColor: 'danger.hover',
      cursor: 'text',
    },
    ':focus-within': {
      ...focusBase,
      borderColor: 'danger.hover',
    },
  },
  readOnly: {
    backgroundColor: 'muted.3',
    borderColor: 'muted.1',
    color: 'secondary.base',
    ':hover': {
      cursor: 'default',
    },
  },
}

const stateDark = {
  default: {
    borderColor: 'muted.2',
    color: 'muted.4',
    ':focus-within': {
      ...focusBase,
      borderColor: 'muted.2',
    },
    ':hover': {
      borderColor: 'muted.1',
      cursor: 'text',
    },
    label: {
      color: 'muted.2',
    },
    svg: {
      color: 'muted.2',
    },
  },
  disabled: {
    ...state.disabled,
    borderColor: 'muted.2',
  },
  error: {
    ...state.error,
    color: 'muted.4',
    label: {
      color: 'muted.2',
    },
    svg: {
      color: 'muted.2',
    },
  },
  readOnly: {
    ...state.readOnly,
    borderColor: 'muted.2',
  },
}

const labelBase = {
  color: 'muted.0',
  width: 'fit-content',
  position: 'absolute',
  pointerEvents: 'none',
  transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
}

const labelRegular = {
  ...labelBase,
  fontSize: '18px',
  lineHeight: '30px',
}

const labelLarge = {
  ...labelBase,
  fontSize: '22px',
  lineHeight: '32px',
}

const labelTranslateRegular = {
  fontSize: 0,
  lineHeight: '1rem',
  transform: 'translateY(-12px)',
}

const labelTranslateLarge = {
  fontSize: 2,
  lineHeight: '1.125rem',
  transform: 'translateY(-16px)',
}

const labelSize = {
  regular: {
    defaultPosition: {
      left: 'auto',
    },
    translate: {
      ...labelTranslateRegular,
    },
  },
  'regular-prefix': {
    defaultPosition: {
      left: 56,
    },
    translate: {
      left: 56,
      ...labelTranslateRegular,
    },
  },
  large: {
    defaultPosition: {
      left: 'auto',
    },
    translate: {
      ...labelTranslateLarge,
    },
  },
  'large-prefix': {
    defaultPosition: {
      left: 56,
    },
    translate: {
      left: 56,
      ...labelTranslateLarge,
    },
  },
}

const label = {
  ...Object.entries(labelSize).reduce(function mergeSize(acc, currSize) {
    const [sizeName, { defaultPosition, translate }] = currSize

    return {
      ...acc,
      [`${sizeName}-default`]: {
        ...(sizeName.startsWith('regular') ? labelRegular : labelLarge),
        ...defaultPosition,
      },
      [`${sizeName}-translate`]: {
        ...(sizeName.startsWith('regular') ? labelRegular : labelLarge),
        ...translate,
      },
    }
  }, []),
}

const helpMessageStyles = {
  mt: 3,
  fontSize: 0,
  lineHeight: '1rem',
  justifyContent: 'space-between',
}

const helpMessage = {
  default: {
    ...helpMessageStyles,
    color: 'muted.0',
  },
  error: {
    ...helpMessageStyles,
    color: 'danger.base',
  },
  disabled: {
    ...helpMessageStyles,
    color: 'muted.1',
  },
  readOnly: {
    ...helpMessageStyles,
    color: 'muted.1',
  },
}

const helpMessageDark = {
  default: {
    ...helpMessageStyles,
    color: 'muted.2',
  },
  error: {
    ...helpMessageStyles,
    color: 'danger.base',
  },
  disabled: {
    ...helpMessageStyles,
    color: 'muted.2',
  },
  readOnly: {
    ...helpMessageStyles,
    color: 'muted.2',
  },
}

const iconBase = {
  alignItems: 'center',
  color: 'muted.0',
}

const container = {
  width: 'fit-content',
  mb: 3,
}

export default {
  ...Object.keys(state).reduce(function mergeState(acc, st) {
    return {
      ...acc,
      ...Object.keys(size).reduce(function mergeSize(bcc, sz) {
        return {
          ...bcc,
          [`${sz}-${st}`]: {
            ...styles,
            ...(state as any)[st],
            ...(size as any)[sz],
          },
          [`${sz}-${st}-dark`]: {
            ...styles,
            ...(stateDark as any)[st],
            ...(size as any)[sz],
          },
        }
      }, []),
    }
  }, {}),
  prefix: { ...iconBase, mr: 3 },
  suffix: { ...iconBase, ml: 3 },
  label,
  helpMessage: { ...helpMessage, dark: { ...helpMessageDark } },
  container,
}
