import '../../../shoreline/styles.css'
import './style.css'

import React, { useState, Fragment } from 'react'
import { IconTrash, IconArrowUpRightSmall } from '@vtex/shoreline-icons'

import { Stack } from '../../stack'
import { Bleed } from '../../bleed'
import { Button } from '../index'

export default {
  title: 'shoreline-components/button',
}

export function Default() {
  return <Button>Create</Button>
}

export function Variants() {
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

export function Bleeding() {
  return (
    <header className="bleeding--decorative-box">
      <Stack direction="row" className="bleeding--custom-stack">
        <Bleed vertical>
          <Button size="large">Large</Button>
        </Bleed>
        <Bleed vertical>
          <Button>Normal</Button>
        </Bleed>
        <Bleed vertical>
          <Button size="large" variant="tertiary">
            Large Tertiary
          </Button>
        </Bleed>
        <Bleed vertical>
          <Button variant="tertiary">Tertiary</Button>
        </Bleed>
      </Stack>
    </header>
  )
}
