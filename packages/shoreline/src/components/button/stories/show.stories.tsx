import { Fragment } from 'react'
import { IconTrash, IconArrowUpRightSmall } from '../../../icons'

import { Button } from '../index'
import './style.css'

export default {
  title: 'components/button',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
}

export function Show() {
  const variants: any[] = [
    'primary',
    'secondary',
    'tertiary',
    'critical',
    'criticalTertiary',
  ]

  const getGrid = (size: 'normal' | 'large', rounded = false) => (
    <div className="variants--grid">
      {variants.map((variant) => (
        <Fragment key={variant}>
          <div className="variants--grid-leading">{variant}</div>
          <div>
            <Button size={size} variant={variant} rounded={rounded}>
              Default
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} rounded={rounded} loading>
              Loading
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} rounded={rounded} disabled>
              Disabled
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} rounded={rounded}>
              <IconTrash />
              Icon
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} rounded={rounded}>
              Icon
              <IconArrowUpRightSmall />
            </Button>
          </div>
        </Fragment>
      ))}
    </div>
  )

  return (
    <div>
      <h3>Normal</h3>
      {getGrid('normal')}
      <h3>Large</h3>
      {getGrid('large')}
      <h3>Rounded Normal</h3>
      {getGrid('normal', true)}
      <h3>Rounded Large</h3>
      {getGrid('large', true)}
    </div>
  )
}
