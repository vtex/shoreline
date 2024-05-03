'use client'

import { Suspense, useMemo, useState } from 'react'
import {
  Spinner,
  TabProvider,
  TabList,
  Tab,
  TabPanel,
  IconCheck,
  SelectProvider,
  SelectTrigger,
  SelectPopover,
  SelectItem,
  Text,
  SelectItemCheck,
  Tooltip,
  Flex,
  IconButton,
  IconCode,
} from '@vtex/shoreline'

import codes from '../../__examples__'
import styles from './preview.module.css'
import { useClipboard } from '../hooks/use-clipboard'

export function Preview(props: Props) {
  const { name, fixedHeight = false } = props

  const [activeId, setActiveId] = useState<string>('preview')
  const [theme, setTheme] = useState<Theme>('base')
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
          <Flex
            align="center"
            justify="space-between"
            style={{
              width: '100%',
            }}
          >
            <div>
              <Tab id="preview">Preview</Tab>
              <Tab id="code">Code</Tab>
            </div>
            <Flex gap="$space-1">
              <SelectProvider
                value={theme}
                setValue={setTheme as (a: string) => void}
                placement="top-end"
              >
                <Tooltip label="Switch theme">
                  <SelectTrigger asChild>
                    <IconButton variant="tertiary" label="Switch theme">
                      <ThemeIndicator theme={theme} />
                    </IconButton>
                  </SelectTrigger>
                </Tooltip>
                <SelectPopover className={styles.themeSelectPopover}>
                  <SelectItem value="muted" asChild>
                    <div className={styles.themeSelectItem}>
                      <ThemeIndicator theme="muted" />
                      <Text>Muted</Text>
                      <SelectItemCheck />
                    </div>
                  </SelectItem>
                  <SelectItem value="base" asChild>
                    <div className={styles.themeSelectItem}>
                      <ThemeIndicator theme="base" />
                      <Text>Base</Text>
                      <SelectItemCheck />
                    </div>
                  </SelectItem>
                </SelectPopover>
              </SelectProvider>
              <Tooltip label={isCopied ? 'Copied' : 'Copy code'}>
                <IconButton
                  variant="tertiary"
                  label="Copy code"
                  onClick={() => {
                    handleCopy(codes[name].code)
                  }}
                >
                  {isCopied ? <IconCheck /> : <IconCode />}
                </IconButton>
              </Tooltip>
            </Flex>
          </Flex>
        </TabList>
        <TabPanel>
          <Suspense fallback={<Spinner description="Loading component" />}>
            <div
              className={styles.previewWrapper}
              data-fixed-height={fixedHeight}
              data-theme={theme}
            >
              {Preview}
            </div>
          </Suspense>
        </TabPanel>
        <TabPanel>
          <div
            className={styles.codeWrapper}
            dangerouslySetInnerHTML={{
              __html: codePreview,
            }}
          />
        </TabPanel>
      </TabProvider>
    </div>
  )
}

function getIndicatorBackground(theme: Theme) {
  switch (theme) {
    case 'base': {
      return 'var(--sl-color-gray-0)'
    }

    case 'muted': {
      return 'var(--sl-color-gray-1)'
    }

    default: {
      return 'transparent'
    }
  }
}

function ThemeIndicator(props: ThemeIndicatorProps) {
  const { theme } = props

  return (
    <div
      style={{
        height: 20,
        width: 20,
        borderRadius: 20,
        boxShadow: '0 0 1px 1px var(--sl-color-gray-8)',
        background: getIndicatorBackground(theme),
      }}
    />
  )
}

interface ThemeIndicatorProps {
  theme: Theme
}

type Theme = 'base' | 'muted'

interface Props {
  name: string
  fixedHeight: boolean
}
