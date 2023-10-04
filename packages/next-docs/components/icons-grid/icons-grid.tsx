import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

import { icons, names } from './icons'

import { IconCard } from './icon-card'
import { variables } from '../../shoreline/theme'
import { iconsGridStyle } from './icons.css'

export function IconsGrid(props: IconsGridProps) {
  const { children, variant = 'default', ...restProps } = props

  const resolvedIcons = resolveIcons(variant)

  return (
    <div className={iconsGridStyle} style={variables as any} {...restProps}>
      {resolvedIcons.map((icon) => {
        const Icon = icons[icon]

        return (
          !!Icon && (
            <IconCard name={icon} key={icon}>
              <Icon />
            </IconCard>
          )
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
  if (variant === 'small' || variant === 'fill') {
    return names.filter((icon) => {
      const lowerIcon = icon.toLowerCase()

      return lowerIcon.includes(variant)
    })
  }

  return names.filter((icon) => {
    const lowerIcon = icon.toLowerCase()

    return !lowerIcon.includes('fill') && !lowerIcon.includes('small')
  })
}
