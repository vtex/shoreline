import type { ComponentPropsWithoutRef } from 'react'
import type { CSSProperties } from '@vtex/shoreline-utils'
import * as SlPackage from '@vtex/shoreline'

import { IconCard } from './icon-card'
import { variables } from '../../shoreline/theme'
import styles from './icons-grid.module.css'

const iconNames = Object.keys(SlPackage).filter(
  (item) => item.startsWith('Icon') && item !== 'IconButton'
)

export function IconsGrid(props: IconsGridProps) {
  const { children, ...restProps } = props

  return (
    <div
      className={styles.iconsGrid}
      style={variables as CSSProperties}
      {...restProps}
    >
      {iconNames.map((icon) => {
        const Component = SlPackage[icon]

        if (!Component) return null

        return (
          <IconCard name={icon} key={icon}>
            <Component />
          </IconCard>
        )
      })}
    </div>
  )
}

type IconsGridProps = ComponentPropsWithoutRef<'div'>
