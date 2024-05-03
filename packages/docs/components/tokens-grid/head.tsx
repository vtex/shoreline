import type { ComponentPropsWithoutRef } from 'react'
import styles from './head.module.css'

export function Head(props: ComponentPropsWithoutRef<'div'>) {
  return <div className={styles.head} {...props} />
}
