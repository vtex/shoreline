import React, { Fragment } from 'react'
import { IconTrash, IconArrowUpRightSmall } from '@vtex/shoreline-icons'

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

  const getGrid = (size: 'normal' | 'large') => (
    <div className="variants--grid">
      {variants.map((variant) => (
        <Fragment key={variant}>
          <div className="variants--grid-leading">{variant}</div>
          <div>
            <Button size={size} variant={variant}>
              Default
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} loading>
              Loading
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant} disabled>
              Disabled
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant}>
              <IconTrash />
              Icon
            </Button>
          </div>
          <div>
            <Button size={size} variant={variant}>
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
      {getGrid('normal')}
      {getGrid('large')}
    </div>
  )
}
