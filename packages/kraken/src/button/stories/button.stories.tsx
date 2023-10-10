import '../../../faststore/styles.css'
import '../../../makeup/brandless/button.css'
// import '../../../shoreline/styles.css'
// import '../../../makeup/tambaba/button.css'

import './style.css'
import '../../center/center.css'
import '../../spinner/spinner.css'

import React, { Fragment } from 'react'
import {
  IconTrash,
  IconArrowUpRightSmall,
  IconArrowUp,
  IconTicket,
} from '@vtex/shoreline-icons'

import { Stack } from '../../stack'
import { Button } from '../index'
import { VisuallyHidden } from '@ariakit/react'

export default {
  title: 'kc/button',
}

export function Default() {
  return <Button>Create</Button>
}

export function Variants() {
  const variants: any[] = ['primary', 'secondary', 'tertiary']

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

  return <div>{getGrid('normal')}</div>
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

function FastStoreButton({
  icon,
  iconPosition,
  testId,
  children,
  ...rest
}: FastStoreButtonProps) {
  return (
    <Button data-testid={testId} {...rest}>
      {iconPosition === 'start' && icon}
      {children}
      {iconPosition === 'end' && icon}
    </Button>
  )
}

interface FastStoreButtonProps {
  children?: React.ReactNode
  variant?: 'primary' | 'secondary' | 'tertiary'
  icon?: React.ReactNode
  iconPosition?: 'start' | 'end'
  testId?: string
}

export function FsAPIExample() {
  return (
    <FastStoreButton icon={<IconTicket />} iconPosition="start">
      Claim your ticket
    </FastStoreButton>
  )
}
