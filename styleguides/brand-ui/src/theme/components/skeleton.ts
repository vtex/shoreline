import { SxStyleProp } from 'theme-ui'

const styles: SxStyleProp = {
  display: 'flex',
  backgroundImage: 'linear-gradient(90deg, #E7E9EE, white, #E7E9EE)',
  borderRadius: '4px',
  backgroundColor: 'muted.3',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '200px 100%',
  marginBottom: 1
}

const skeleton = {
  rect: {
    ...styles,
  },
  circle: {
    ...styles,
    borderRadius: '50%',
  }
}

export default skeleton
