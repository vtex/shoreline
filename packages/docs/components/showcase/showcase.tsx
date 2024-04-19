'use client'

import React, { Suspense, useMemo } from 'react'
import { Spinner } from '@vtex/shoreline'

import codes from '../../__examples__'
import styles from './preview.module.css'
import { getComponentProps } from '../../utils/get-component-props'
import summaryStyles from '../component-summary/component-summary.module.css'

export function Showcase(props: ShowcaseProps) {
  const { name } = props

  const componentProps = getComponentProps(name)

  const Preview = useMemo(() => {
    const Comp = codes[name].component

    if (!Comp) {
      return <div>not found</div>
    }

    return <Comp />
  }, [name])

  return (
    <div>
      <div className={styles.preview}>
        <Suspense fallback={<Spinner description="Loading component" />}>
          <div className={styles.previewWrapper}>{Preview}</div>
        </Suspense>
      </div>
      <div className={summaryStyles.contentWrapper}>
        <h3 className={summaryStyles.title}>{componentProps?.name}</h3>
        <p className={summaryStyles.description}>
          {componentProps?.description}
        </p>
      </div>
    </div>
  )
}

interface ShowcaseProps {
  name: string
}
