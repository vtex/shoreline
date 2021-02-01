export const tab = {
  styles: {
    fontSettings: 'regular',
    border: 'none',
    borderRadius: 'default',
    borderBottomLeftRadius: '0px',
    borderBottomRightRadius: '0px',
    borderBottomStyle: 'solid',
    borderBottomColor: 'transparent',
    borderBottomWidth: 2,
    borderTopStyle: 'solid',
    borderTopColor: 'transparent',
    borderTopWidth: 2,
    height: 44,
    minWidth: 110,
    cursor: 'pointer',
    position: 'relative',
    ':focus:not([data-focus-visible-added])': {
      outline: 'none',
      boxShadow: 'none',
    },
    ':focus': {
      outline: 'none',
      boxShadow: 'focus',
    },
    paddingX: 6,
    textTransform: 'uppercase',
    backgroundColor: 'transparent',
    color: 'dark.secondary',
  },
  variant: {
    default: {
      ':hover': {
        color: 'blue.hover',
      },
    },
    active: { borderBottomColor: 'blue', color: 'blue' },
  },
}

export const tabList = {
  styles: {
    paddingX: 4,
    width: 'full',
  },
  variant: {
    block: {
      display: 'inline-block',
    },
    fluid: {
      display: 'flex',
      justifyContent: 'space-evenly',
      '> button': { width: 'full' },
    }
  }
}

export const tabContent = {
  ':focus:not([data-focus-visible-added])': {
    outline: 'none',
    boxShadow: 'none',
  },
  ':focus': {
    outline: 'none',
    boxShadow: 'focus',
  },
}
