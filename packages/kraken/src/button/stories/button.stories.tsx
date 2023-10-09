import '../../../shoreline/styles.css'
import './style.css'
import '../button.css'
import '../../bleed/bleed.css'
import '../../center/center.css'
import '../../spinner/spinner.css'

import React, { Fragment } from 'react'
import {
  IconTrash,
  IconArrowUpRightSmall,
  IconArrowUp,
} from '@vtex/shoreline-icons'

import { Stack } from '../../stack'
import { Bleed } from '../../bleed'
import { Button } from '../index'
import { VisuallyHidden } from '@ariakit/react'

export default {
  title: 'kc/button',
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

export function Composition() {
  return (
    <Stack>
      <Button asChild>
        <a href="https://vtex.com" target="_blank" rel="noreferrer">
          Preview site <IconArrowUpRightSmall />
        </a>
      </Button>
      <Button asChild>
        <label htmlFor="file-input">
          <IconArrowUp /> Upload file
        </label>
      </Button>
      <VisuallyHidden>
        <input id="file-input" type="file" />
      </VisuallyHidden>
    </Stack>
  )
}
