import React from 'react'
import allProps from '../../__props__'
import styles from './component-description.module.css'

export function ComponentDescription(props: PropsDocsProps) {
  const { name } = props

  const reference = allProps[name]

  if (!reference) {
    return <></>
  }

  return <p className={styles.description}>{reference.description}</p>
}

interface PropsDocsProps {
  name: string
}
