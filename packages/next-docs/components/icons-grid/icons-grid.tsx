import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { icons, iconsKeys } from './icons'

import { csx } from '@vtex/admin-ui'
import { IconCard } from './icon-card'
import { variables } from '../../shoreline/theme'

export function IconsGrid(props: IconsGridProps) {
  const { children, variant = 'default', ...restProps } = props

  const resolvedIcons = resolveIcons(variant)

  console.log({ icons })

  return (
    <div
      className={csx({
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
      })}
      style={variables as any}
      {...restProps}
    >
      {resolvedIcons.map((icon) => {
        const Icon = icons[icon]

        console.log({ Icon })

        return (
          <IconCard name={icon} key={icon}>
            {Icon ? <Icon /> : '-'}
          </IconCard>
        )
      })}
    </div>
  )
}

interface IconsGridProps extends ComponentPropsWithoutRef<'div'> {
  variant?: 'default' | 'fill' | 'small'
}

type IconVariant = 'default' | 'fill' | 'small'

function resolveIcons(variant: IconVariant): string[] {
  if (variant === 'small') {
    return iconsKeys.filter((icon) => {
      const lowerIcon = icon.toLowerCase()

      return lowerIcon.includes('small')
    })
  }

  if (variant === 'fill') {
    return iconsKeys.filter((icon) => {
      const lowerIcon = icon.toLowerCase()

      return lowerIcon.includes('fill')
    })
  }

  return iconsKeys.filter((icon) => {
    const lowerIcon = icon.toLowerCase()

    return !lowerIcon.includes('fill') && !lowerIcon.includes('small')
  })
}
