import { jsx } from '@vtex/onda-react'

import { Set } from '../../Set'

export const Section = jsx(Set)({
  paddingY: '4',
  overflow: 'auto',
})

Section.defaultProps = {
  spacing: 3,
}
