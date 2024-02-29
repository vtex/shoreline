import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'
import { descriptions } from './icons'

import styles from './icon-card.module.css'

export function IconCard(props: IconCardProps) {
  const { children, name = '', ...restProps } = props

  const description = descriptions[name] ?? '-'

  return (
    <div className={styles.iconCard} {...restProps}>
      {children}
      <span className={styles.iconName}>{name}</span>
      <span className={styles.iconDescription}>{description}</span>
    </div>
  )
}

interface IconCardProps extends ComponentPropsWithoutRef<'div'> {
  name: string
}
