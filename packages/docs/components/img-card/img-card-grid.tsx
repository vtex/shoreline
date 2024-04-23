import type { ComponentPropsWithoutRef, CSSProperties } from 'react'
import React from 'react'
import styles from './img-card-grid.module.css'

/**
 * Renders a grid for ImgCards
 * @example
 * <ImgCardGrid>
 *  <ImgCard {...} />
 *  <ImgCard {...} />
 *  <ImgCard {...} />
 * </ImgCardGrid>
 */
export function ImgCardGrid(props: ImgCardGridProps) {
  const { children, rows = 3, style, mt, mr, mb, ml, ...otherProps } = props

  return (
    <div
      className={styles.grid}
      style={
        {
          ...style,
          '--rows': rows,
          '--mt': mt,
          '--mr': mr,
          '--mb': mb,
          '--ml': ml,
        } as CSSProperties
      }
      {...otherProps}
    >
      {children}
    </div>
  )
}

interface ImgCardGridProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Number of rows
   * @default 3
   */
  rows?: number
  /**
   * margin-top
   */
  mt?: string
  /**
   * margin-right
   */
  mr?: string
  /**
   * margin-bottom
   */
  mb?: string
  /**
   * margin-left
   */
  ml?: string
}
