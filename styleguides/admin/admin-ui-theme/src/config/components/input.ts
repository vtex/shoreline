export default {
  container: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'flex-start',
    flexDirection: 'column',
  },
  'floating-label': {
    fontSize: 1,
    left: 12,
    paddingTop: 2,
    color: 'mid.0',
    marginBottom: 3,
    position: 'absolute',
    transform: 'translate(0, 16px) scale(1)',
    transformOrigin: 'top left',
    transition: 'all 0.2s ease-out;',
  },
  'text-container': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: '',
    paddingTop: 1,
  },
}
