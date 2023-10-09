// import '../../../shoreline/styles.css'
import React, { useRef } from 'react'

import { Compose, Composable } from '../index'
import type { AnyObject } from '@vtex/shoreline-utils'
import { VisuallyHidden } from '../../visually-hidden'

export default {
  title: 'kc/compose',
}

export function Default() {
  const ref = useRef()

  return (
    <Compose
      onClick={() => {
        console.log('clicked')
      }}
      ref={ref}
    >
      <a href="https://vtex.com.br" target="_blank" rel="noreferrer">
        Go to VTEX
      </a>
    </Compose>
  )
}

function Button({ asChild, style, children, ...props }: AnyObject) {
  const Comp = asChild ? Compose : 'button'

  return (
    <Comp
      {...props}
      style={{
        appearance: 'button',
        cursor: 'pointer',
        textDecoration: 'none',
        color: 'var(--sl-fg)',
        background: 'var(--sl-bg-muted)',
        padding: 'var(--sl-space-gap)',
        borderRadius: 'var(--sl-border-radius-medium)',
        margin: 'var(--sl-space-gap)',
        ...style,
      }}
    >
      Prefix - <Composable>{children}</Composable> - Suffix
    </Comp>
  )
}

export function AsChild() {
  return (
    <div>
      <Button>Button (button)</Button>
      <Button asChild>
        <a href="https://vtex.com.br" target="_blank" rel="noreferrer">
          Go to VTEX (a)
        </a>
      </Button>
      <Button asChild>
        <label htmlFor="file-input">Upload file (label)</label>
      </Button>
      <VisuallyHidden>
        <input type="file" id="file-input" />
      </VisuallyHidden>
    </div>
  )
}
