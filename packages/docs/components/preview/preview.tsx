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
  SelectProvider,
  SelectTrigger,
  SelectPopover,
  SelectItem,
  Text,
  SelectItemCheck,
  Tooltip,
} from '@vtex/shoreline'

import codes from '../../__examples__'
import styles from './preview.module.css'
import { useClipboard } from '../hooks/use-clipboard'

export function Preview(props: Props) {
  const { name, fixedHeight = false } = props

  const [activeId, setActiveId] = useState<string>('preview')
  const [bg, setBg] = useState('muted')
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
            <div
              className={styles.previewWrapper}
              data-fixed-height={fixedHeight}
              data-bg={bg}
              style={{
                position: 'relative',
              }}
            >
              {Preview}

              <SelectProvider value={bg} setValue={setBg} placement="top-end">
                <Tooltip label="Switch theme">
                  <SelectTrigger
                    style={{ position: 'absolute', bottom: 16, right: 16 }}
                  >
                    <div
                      style={{
                        height: 32,
                        width: 32,
                        borderRadius: 32,
                        boxShadow: '0 0 0 1px var(--sl-color-gray-4)',
                        background: `var(--sl-color-${
                          bg === 'base' ? 'gray-0' : 'gray-1'
                        })`,
                      }}
                    />
                  </SelectTrigger>
                </Tooltip>
                <SelectPopover className={styles.themeSelectPopover}>
                  <SelectItem value="muted" asChild>
                    <div className={styles.themeSelectItem}>
                      <div
                        style={{
                          height: 24,
                          width: 24,
                          borderRadius: 24,
                          boxShadow: '0 0 0 1px var(--sl-color-gray-4)',
                          background: `var(--sl-color-gray-1)`,
                          cursor: 'default',
                        }}
                      />
                      <Text>Muted</Text>
                      <SelectItemCheck />
                    </div>
                  </SelectItem>
                  <SelectItem value="base" asChild>
                    <div className={styles.themeSelectItem}>
                      <div
                        style={{
                          height: 24,
                          width: 24,
                          borderRadius: 24,
                          boxShadow: '0 0 0 1px var(--sl-color-gray-4)',
                          background: `var(--sl-color-gray-0)`,
                          cursor: 'default',
                        }}
                      />
                      <Text>Base</Text>
                      <SelectItemCheck />
                    </div>
                  </SelectItem>
                </SelectPopover>
              </SelectProvider>
            </div>
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
  fixedHeight: boolean
}
