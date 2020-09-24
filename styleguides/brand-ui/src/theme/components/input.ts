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
  },
  error: {
    borderColor: 'danger.base',
  },
  filled: {
    borderColor: 'secondary.hover',
    color: 'muted.0',
  },
  readOnly: {
    backgroundColor: 'muted.3',
    borderColor: 'muted.1',
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
}
