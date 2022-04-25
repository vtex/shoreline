/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import * as React from 'react'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import clsx from 'clsx'
import BrowserOnly from '@docusaurus/BrowserOnly'
import { usePrismTheme } from '@docusaurus/theme-common'
import styles from './styles.module.scss'
import useIsBrowser from '@docusaurus/useIsBrowser'

import { Button, IconArrowsClockwise } from '@vtex/admin-ui'

import {
  useCollapsibleCodeBlock,
  useCopyCodeBlock,
} from '../../components/CodeBlockWrapper'
import { CodePreviewContainer } from '../../components/CodePreviewContainer'

function Header({ children }) {
  return <div className={clsx(styles.playgroundHeader)}>{children}</div>
}

function LivePreviewLoader() {
  // Is it worth improving/translating?
  return <div>Loading...</div>
}

function ResultWithHeader(playgroundProps) {
  const PreviewComponent = (props) => (
    <CodePreviewContainer {...playgroundProps}>
      {props.children}
    </CodePreviewContainer>
  )

  return (
    <>
      <div className={styles.playgroundPreview}>
        <BrowserOnly fallback={<LivePreviewLoader />}>
          {() => (
            <>
              <LivePreview Component={PreviewComponent} />
              <LiveError />
            </>
          )}
        </BrowserOnly>
      </div>
    </>
  )
}

function ThemedLiveEditor() {
  const isBrowser = useIsBrowser()
  return (
    <LiveEditor
      // We force remount the editor on hydration,
      // otherwise dark prism theme is not applied
      key={isBrowser}
      className={styles.playgroundEditor}
    />
  )
}

function EditorWithHeader(props) {
  const { isCodeVisible, ToggleCodeButton } = useCollapsibleCodeBlock()
  const { CopyCodeButton } = useCopyCodeBlock(props.currentCode)

  return (
    <>
      {isCodeVisible && <ThemedLiveEditor />}
      <Header>
        {isCodeVisible && <CopyCodeButton code={props.currentCode} />}
        {isCodeVisible && (
          <Button
            variant="neutralTertiary"
            icon={<IconArrowsClockwise />}
            onClick={props.onRefresh}
          >
            Refresh code
          </Button>
        )}
        <ToggleCodeButton />
      </Header>
    </>
  )
}

export default function Playground({ children, ...props }) {
  const [currentCode, setCurrentCode] = React.useState(children)
  const prismTheme = usePrismTheme()

  const showEditor = props?.live && !props?.previewOnly

  const transformCode = (code) => {
    setCurrentCode(code)

    return `${code};`
  }

  const handleRefresh = () => {
    setCurrentCode(children)
  }

  return (
    <div className={styles.playgroundContainer}>
      <LiveProvider
        code={currentCode.replace(/\n$/, '')}
        transformCode={transformCode}
        theme={prismTheme}
        {...props}
      >
        <>
          <ResultWithHeader {...props} />
          {showEditor ? (
            <EditorWithHeader
              currentCode={currentCode}
              onRefresh={handleRefresh}
            />
          ) : null}
        </>
      </LiveProvider>
    </div>
  )
}
