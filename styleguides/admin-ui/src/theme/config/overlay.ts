import { SxStyleProp } from 'theme-ui'

export default {
  menu: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'background',
    marginTop: 4,
    paddingX: 9,
    paddingTop: 7,
    paddingBottom: 5,
    width: 18,
    borderRadius: 3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'muted.2',
    '> button': {
      paddingX: 0,
      paddingY: 0,
      marginY: 3,
      height: 8,
      color: 'text',
      fontSize: 1,
      border: 'none',
      ':hover': {
        color: 'text',
      },
      width: 'full',
      div: {
        justifyContent: 'flex-start',
      },
      svg: {
        marginLeft: 0,
      },
    },
  },
} as Record<string, SxStyleProp>
