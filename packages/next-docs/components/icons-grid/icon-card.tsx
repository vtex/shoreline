import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { descriptions } from './icons'
import {
  iconNameStyle,
  iconsCardStyle,
  iconDescriptionStyle,
} from './icons.css'

export function IconCard(props: IconCardProps) {
  const { children, name = '', ...restProps } = props

  const description = descriptions[name]

  return (
    <div className={iconsCardStyle} {...restProps}>
      {children}
      <span className={iconNameStyle}>{name}</span>
      <span className={iconDescriptionStyle}>{description}</span>
    </div>
  )
}

interface IconCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
}
