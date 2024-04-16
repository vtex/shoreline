import React from 'react'
import allProps from '../../__props__'
import styles from './component-description.module.css'

export function ComponentDescription(props: PropsDocsProps) {
  const { name, children } = props

  const reference = allProps[name]

  if (!reference && !children) {
    return <></>
  }

  return (
    <p className={styles.description}>{children ?? reference.description}</p>
  )
}

interface PropsDocsProps {
  name: string
  children?: string
}
