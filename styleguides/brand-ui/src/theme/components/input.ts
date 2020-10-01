const styles = {
  paddingX: 4,
  alignItems: 'center',
  position: 'relative',
  width: 'fit-content',
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: 'muted.2',
  borderRadius: 3,
  ':hover': {
    borderColor: 'secondary.hover',
  },
}

const size = {
  regular: {
    height: 48,
  },
  small: {
    height: 36,
  },
  large: {
    height: 56,
  },
}

const state = {
  idle: {},
  focused: {
    borderColor: 'secondary.hover',
    boxShadow: (t: any) => `0 0 0 ${t.borderWidths[2]}px ${t.colors.focus}`,
    outline: 'none',
  },
  disabled: {
    color: 'muted.1',
    ':hover': {
      borderColor: 'muted.2',
      cursor: 'not-allowed',
    },
  },
  error: {
    borderColor: 'danger.base',
    ':hover': {
      borderColor: 'danger.hover',
      label: {
        color: 'danger.hover',
      },
    },
  },
  filled: {
    borderColor: 'secondary.hover',
    color: 'muted.0',
  },
  readOnly: {
    backgroundColor: 'muted.3',
    borderColor: 'muted.1',
    ':hover': {
      borderColor: 'muted.1',
    },
  },
}

const labelStyles = {
  color: 'muted.0',
  width: 'fit-content',
  position: 'absolute',
  pointerEvents: 'none',
  fontSize: 2,
  lineHeight: 'action',
  transition: 'transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
}

const labelTranslate = {
  paddingX: 2,
  fontSize: 0,
  paddingY: 0,
  lineHeight: 'small',
  backgroundColor: 'white',
}

const labelSize = {
  small: {
    defaultPosition: {
      left: 'auto',
    },
    translate: {
      ...labelTranslate,
      transform: 'translateY(-18px)',
    },
  },
  'small-prefix': {
    defaultPosition: {
      left: 48,
    },
    translate: {
      left: 48,
      ...labelTranslate,
      transform: 'translate(-32px, -18px)',
    },
  },
  regular: {
    defaultPosition: {
      left: 'auto',
    },
    translate: {
      ...labelTranslate,
      transform: 'translateY(-24px)',
    },
  },
  'regular-prefix': {
    defaultPosition: {
      left: 48,
    },
    translate: {
      left: 48,
      ...labelTranslate,
      transform: 'translate(-32px, -24px)',
    },
  },
  large: {
    defaultPosition: {
      left: 'auto',
    },
    translate: {
      ...labelTranslate,
      transform: 'translateY(-28px)',
    },
  },
  'large-prefix': {
    defaultPosition: {
      left: 48,
    },
    translate: {
      left: 48,
      ...labelTranslate,
      transform: 'translate(-32px, -28px)',
    },
  },
}

const labelState = {
  idle: {},
  disabled: {
    color: 'muted.1',
  },
  error: {
    ...labelTranslate,
    color: 'danger.base',
  },
  filled: {
    ...labelTranslate,
  },
  focused: {
    ...labelTranslate,
  },
  readOnly: {
    ...labelTranslate,
  },
}

const label = {
  ...Object.entries(labelState).reduce(function mergeState(acc, currState) {
    const [stateName, stateStyles] = currState

    return {
      ...acc,
      ...Object.entries(labelSize).reduce(function mergeSize(bcc, currSize) {
        const [sizeName, { defaultPosition, translate }] = currSize
        let currLabelStyles

        if (stateName === 'idle' || stateName === 'disabled') {
          currLabelStyles = {
            ...labelStyles,
            ...stateStyles,
            ...defaultPosition,
          }
        } else {
          currLabelStyles = { ...labelStyles, ...stateStyles, ...translate }
        }

        return {
          ...bcc,
          [`${sizeName}-${stateName}`]: currLabelStyles,
        }
      }, []),
    }
  }, {}),
}

const helpMessageStyles = {
  color: 'muted.0',
  mt: 2,
  fontSize: 0,
  justifyContent: 'space-between',
}

const helpMessage = {
  default: {
    ...helpMessageStyles,
  },
  error: {
    ...helpMessageStyles,
    color: 'danger.base',
  },
  disabled: {
    ...helpMessageStyles,
    color: 'muted.1',
  },
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
        }
      }, []),
    }
  }, {}),
  prefix: { alignItems: 'center', mr: 3 },
  suffix: { alignItems: 'center', ml: 3 },
  label,
  helpMessage,
}
