import '../../../shoreline/styles.css'

import React, { useState, Fragment } from 'react'
import {
  IconTrash,
  IconArrowUpRightSmall,
  IconCheckSmall,
  IconBarcode,
} from '@vtex/shoreline-icons'

import { Flex } from '../../flex'
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

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 96px)',
          width: '100%',
          gap: '1rem',
          padding: '1rem',
        }}
      >
        {variants.map((variant) => (
          <Fragment key={variant}>
            <div
              style={{
                fontFamily: 'system-ui',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {variant}
            </div>
            <div>
              <Button variant={variant}>Default</Button>
            </div>
            <div>
              <Button variant={variant} loading>
                Loading
              </Button>
            </div>
            <div>
              <Button variant={variant} disabled>
                Disabled
              </Button>
            </div>
            <div>
              <Button variant={variant}>
                <IconTrash />
                Icon
              </Button>
            </div>
            <div>
              <Button variant={variant}>
                Icon
                <IconArrowUpRightSmall />
              </Button>
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 96px)',
          width: '100%',
          gap: '1rem',
          padding: '1rem',
          marginTop: '2rem',
        }}
      >
        {variants.map((variant) => (
          <Fragment key={variant}>
            <div
              style={{
                fontFamily: 'system-ui',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {variant}
            </div>
            <div>
              <Button size="large" variant={variant}>
                Default
              </Button>
            </div>
            <div>
              <Button size="large" variant={variant} loading>
                Loading
              </Button>
            </div>
            <div>
              <Button size="large" variant={variant} disabled>
                Disabled
              </Button>
            </div>
            <div>
              <Button size="large" variant={variant}>
                <IconTrash />
                Icon
              </Button>
            </div>
            <div>
              <Button size="large" variant={variant}>
                Icon
                <IconArrowUpRightSmall />
              </Button>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

export function Loading() {
  const [loading, setLoading] = useState(true)

  return (
    <Button onClick={() => setLoading((l) => !l)} loading={loading}>
      Create
    </Button>
  )
}

export function Bleeding() {
  return (
    <header
      style={{
        padding: 'var(--sl-space-8) var(--sl-space-10)',
        backgroundColor: 'pink',
      }}
    >
      <Flex justify="space-between" align="center">
        <h1>Orders</h1>
        <Bleed>
          <Button>Create</Button>
        </Bleed>
        <Bleed>
          <Button>Create</Button>
        </Bleed>
      </Flex>
    </header>
  )
}
