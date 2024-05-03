import type { ComponentPropsWithoutRef, ReactNode } from 'react'
import NextLink from 'next/link'
import styles from './img-card.module.css'

/**
 * Renders a card with an image
 */
export function ImgCard(props: ImgCardProps) {
  const { href, image, title, description, ...otherProps } = props

  return (
    <NextLink className={styles.card} href={href} {...otherProps}>
      <div className={styles.imgWrapper}>{image}</div>
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
    </NextLink>
  )
}

interface ImgCardProps extends Omit<ComponentPropsWithoutRef<'a'>, 'title'> {
  /**
   * Link href
   */
  href: string
  /**
   * Component image
   */
  image: ReactNode
  /**
   * card title
   */
  title: ReactNode
  /**
   * Card description
   */
  description: ReactNode
}
