'use client'

import React, { Suspense, useMemo, useState } from 'react'
import {
  Spinner,
  TabProvider,
  TabList,
  Tab,
  TabPanel,
  IconCopySimple,
  IconCheck,
} from '@vtex/shoreline'

import codes from '../../__examples__'
import styles from './preview.module.css'
import { useClipboard } from '../hooks/use-clipboard'

export function Preview(props: Props) {
  const { name } = props

  const [activeId, setActiveId] = useState<string>('preview')
  const { isCopied, handleCopy } = useClipboard()

  const codePreview = useMemo(() => {
    return codes[name].preview
  }, [name])

  const Preview = useMemo(() => {
    const Comp = codes[name].component

    if (!Comp) {
      return <div>not found</div>
    }

    return <Comp />
  }, [name])

  return (
    <div className={styles.preview}>
      <TabProvider selectedId={activeId} setSelectedId={setActiveId as any}>
        <TabList aria-label="Preview mode">
          <Tab id="preview">Preview</Tab>
          <Tab id="code">Code</Tab>
        </TabList>
        <TabPanel>
          <Suspense fallback={<Spinner description="Loading component" />}>
            <div className={styles.previewWrapper}>{Preview}</div>
          </Suspense>
        </TabPanel>
        <TabPanel style={{ position: 'relative' }}>
          <div
            className={styles.codeWrapper}
            dangerouslySetInnerHTML={{
              __html: codePreview,
            }}
          />
          <button
            onClick={() => {
              handleCopy(codes[name].code)
            }}
            className={styles.copyButton}
          >
            {isCopied ? <IconCheck /> : <IconCopySimple />}
          </button>
        </TabPanel>
      </TabProvider>
    </div>
  )
}

interface Props {
  name: string
}
