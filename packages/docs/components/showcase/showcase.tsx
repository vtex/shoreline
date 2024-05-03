'use client'

import { Suspense, useMemo } from 'react'
import { Spinner, cx } from '@vtex/shoreline'
import NextLink from 'next/link'

import codes from '../../__examples__'
import styles from './showcase.module.css'
import { getComponentProps } from '../../utils/get-component-props'
import summaryStyles from '../img-card/img-card.module.css'

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
        <NextLink href={`/components/${name}`}>
          <h3 className={cx(summaryStyles.title, styles.title)}>
            {componentProps?.name}
          </h3>
        </NextLink>
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
