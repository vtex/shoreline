import controlGroup from './controlGroup'
import radio from './radio'
import checkbox from './checkbox'
import toggle from './toggle'
import input from './input'

export default {
  ...controlGroup,
  ...toggle,
  ...checkbox,
  ...radio,
  ...input,
}
