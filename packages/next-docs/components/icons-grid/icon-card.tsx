import { csx } from '@vtex/admin-ui'
import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { iconsDescription } from './icons'

export function IconCard(props: IconCardProps) {
  const { children, name = '', ...restProps } = props

  const description = iconsDescription[name]

  return (
    <div
      className={csx({
        display: 'flex',
        paddingY: '1.5rem',
        paddingX: '1rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        svg: {
          marginBottom: '1rem',
        },
      })}
      {...restProps}
    >
      {children}
      <span
        className={csx({
          color: 'var(--sl-fg-muted)',
          text: '$body',
        })}
      >
        {name}
      </span>
      <span
        className={csx({
          color: '$secondary',
          text: '$detail',
          textAlign: 'center',
        })}
      >
        {description}
      </span>
    </div>
  )
}

interface IconCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
}
