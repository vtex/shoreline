/* eslint-disable @typescript-eslint/no-explicit-any */

const headerBase = {
  backgroundColor: 'transparent',
  border: 'none',
  px: 2,
  py: 4,
  alignItems: 'center',
  width: '100%',
  cursor: 'pointer',
  color: 'secondary.base',
  transition: 'ease 300ms all',
  '&:disabled': {
    color: 'muted.2',
  },
  '&:focus': {
    outline: 'none',
  },
  '&:hover': {
    backgroundColor: 'muted.3',
  },
}

const positions = {
  right: {
    justifyContent: 'space-between',
  },
  left: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
}

const sizes = {
  regular: {
    fontSize: 2,
    lineHeight: '28px',
  },
  small: {
    fontSize: 1,
    lineHeight: '20px',
  },
}

const header = {
  ...Object.keys(sizes).reduce(
    (acc, size) => ({
      ...acc,
      ...Object.keys(positions).reduce(
        (bcc, position) => ({
          ...bcc,
          [`${size}-${position}`]: {
            ...headerBase,
            ...(sizes as any)[size],
            ...(positions as any)[position],
          },
        }),
        {}
      ),
    }),
    {}
  ),
  content: {
    mr: 2,
  },
  arrow: {
    center: {
      alignSelf: 'center',
    },
    start: {
      alignSelf: 'end',
    },
    end: {
      alignSelf: 'flex-end',
    },
  },
}

const contentBase = {
  p: 4,
  color: 'muted.0',
}

const content = {
  regular: {
    ...contentBase,
    px: 4,
  },
  stacked: {
    ...contentBase,
    ml: 5,
    pr: 0,
    pt: 0,
  },
}

const collapsible = {
  backgroundColor: 'transparent',
  header,
  content,
}

export default collapsible
