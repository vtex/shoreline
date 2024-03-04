'use client'

import React, { Suspense, useMemo } from 'react'
import { Spinner } from '@vtex/shoreline-components'
import * as Ariakit from '@ariakit/react'

import codes from '../../__examples__'
import styles from './component-preview.module.css'

export function ComponentPreview(props: Props) {
  const { name } = props

  const code = useMemo(() => {
    return codes[name].code
  }, [name])

  const Preview = useMemo(() => {
    const Comp = codes[name].component

    if (!Comp) {
      return <div>not found</div>
    }

    return <Comp />
  }, [name])

  return (
    <div className={styles.wrapper}>
      <Ariakit.TabProvider>
        <Ariakit.TabList className={styles.tablist} aria-label="Preview mode">
          <Ariakit.Tab className={styles.tab}>Preview</Ariakit.Tab>

          <Ariakit.Tab className={styles.tab}>Code</Ariakit.Tab>
        </Ariakit.TabList>
        <div>
          <Ariakit.TabPanel>
            <Suspense fallback={<Spinner description="Loading component" />}>
              {Preview}
            </Suspense>
          </Ariakit.TabPanel>
          <Ariakit.TabPanel className={styles.code}>
            <div
              dangerouslySetInnerHTML={{
                __html: code,
              }}
            />
          </Ariakit.TabPanel>
        </div>
      </Ariakit.TabProvider>
    </div>
  )
}

interface Props {
  name: string
}
