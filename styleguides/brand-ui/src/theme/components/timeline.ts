const timeline = {
  '& > *:last-child': {
    '& > *:nth-child(2)': {
      pb: 0,
    },
    '& > *:first-child > *:last-child': {
      display: 'none',
    },
  },
  width: '100%',
  maxWidth: '100%',
  event: {
    pl: 5,
    pb: 6,
    title: {
      mb: 2,
      fontSize: [2, 3],
      fontWeight: 'regular',
    },
    content: {
      fontSize: 1,
    },
    icon: {
      display: 'flex',
      flexDirection: 'column',
      width: '18px',
      minWidth: '18px',
      alignItems: 'center',
      default: {
        width: '18px',
        height: '18px',
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
