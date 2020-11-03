const timeline = {
  '& > *:last-child > *:first-child': {
    pb: 0,
    '& > *:last-child': {
      display: 'none',
    },
  },
  width: '100%',
  maxWidth: '100%',
  event: {
    pl: 5,
    pb: 7,
    title: {
      width: '100%',
      mb: 4,
      fontSize: 2,
      fontWeight: 'bold',
      lineHeight: '20px',
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      width: '16px',
      minWidth: '16px',
      alignItems: 'center',
      default: {
        width: '16px',
        height: '16px',
        p: 1,
        '& > div': {
          backgroundColor: 'muted.2',
          borderRadius: '100%',
          height: '100%',
          width: '100%',
        },
      },
    },
    line: {
      height: '100%',
      width: 2,
      backgroundColor: 'muted.2',
    },
  },
}

export default timeline
