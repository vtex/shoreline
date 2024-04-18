import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'
import NextLink from 'next/link'
import styles from './component-summary.module.css'
import { getComponentProps } from '../../utils/get-component-props'

export function ComponentSummary(props: ComponentSummaryProps) {
  const {
    children,
    title,
    description,
    icon,
    href,
    image,
    name,
    ...restProps
  } = props

  const componentProps = getComponentProps(name)

  return (
    <NextLink className={styles.card} href={href} {...restProps}>
      <div className={styles.imgWrapper}>{image}</div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{componentProps?.name}</h3>
        <p className={styles.description}>{componentProps?.description}</p>
      </div>
    </NextLink>
  )
}

interface ComponentSummaryProps extends ComponentPropsWithoutRef<'a'> {
  children: ReactNode
  title: string
  href: string
  icon: ReactNode
  description?: string
  image?: ReactNode
  /**
   * Component name
   */
  name: string
}
