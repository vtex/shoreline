const headerBase = {
  backgroundColor: 'transparent',
  border: 'none',
  px: 2,
  justifyContent: 'space-between',
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

const header = {
  regular: {
    ...headerBase,
    fontSize: 2,
    height: 64,
  },
  small: {
    ...headerBase,
    fontSize: 1,
    height: 48,
  },
  content: {
    mr: 3,
  },
}

const contentBase = {
  pt: 2,
  pb: 5,
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
  },
}

const collapsible = {
  borderBottom: 'solid',
  borderBottomWidth: 1,
  borderBottomColor: 'muted.2',
  backgroundColor: 'transparent',
  header,
  content,
}

export default collapsible
