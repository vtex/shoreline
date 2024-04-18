import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import React from 'react'
import NextLink from 'next/link'
import Image from 'next/image'
import styles from './component-summary.module.css'
import { getComponentProps } from '../../utils/get-component-props'

const imageEstimatedWidth = 370
const imageEstimatedHeight = 218

/**
 * Renders a component summary
 */
export function ComponentSummary(props: ComponentSummaryProps) {
  const { href, image, name, ...restProps } = props

  const componentProps = getComponentProps(name)

  return (
    <NextLink
      className={styles.card}
      href={href || `/components/${name}`}
      {...restProps}
    >
      <div className={styles.imgWrapper}>
        <Image
          src={`/assets/all-${name}.png`}
          alt={name}
          width={imageEstimatedWidth}
          height={imageEstimatedHeight}
        />
      </div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{componentProps?.name}</h3>
        <p className={styles.description}>{componentProps?.description}</p>
      </div>
    </NextLink>
  )
}

interface ComponentSummaryProps extends ComponentPropsWithoutRef<'a'> {
  /**
   * Link href
   */
  href?: string
  /**
   * Component image
   */
  image?: ReactNode
  /**
   * Component name
   */
  name: string
}
