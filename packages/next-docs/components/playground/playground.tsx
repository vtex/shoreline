import React, { useState } from 'react'
import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  UnstyledOpenInCodeSandboxButton,
} from '@codesandbox/sandpack-react'
import {
  IconArrowSquareOut,
  IconCode,
  IconCornersOut,
  Stack,
  useCollapse,
} from '@vtex/admin-ui'
import { CopyCodeButton, Header, HeaderButton, RefreshButton } from './header'
import { rootCode } from './root-code'
import {
  copyCodeButtonStyle,
  editorContainerStyle,
  editorStyle,
  headerButtonStyle,
  layoutStyle,
  previewStyle,
  sandpackContainer,
} from './playground.css'

export function Playground(props: CodeProps) {
  const { files, dependencies = {} } = props

  const [fullscreen, setFullscreen] = useState(false)

  const toggleFullscreen = () => setFullscreen((prev) => !prev)
  const { getToggleProps, getCollapseProps, visible } = useCollapse()

  return (
    <SandpackProvider
      className={sandpackContainer}
      template="react"
      files={{
        ...files,
        '/index.js': {
          code: rootCode,
          hidden: true,
        },
      }}
      customSetup={{
        dependencies: {
          ...dependencies,
          '@vtex/admin-ui': 'latest',
          '@vtex/shoreline-components': 'latest',
        },
        entry: '/index.js',
      }}
    >
      <SandpackLayout data-is-fullscreened={fullscreen} className={layoutStyle}>
        <SandpackPreview
          showRefreshButton={false}
          showOpenInCodeSandbox={false}
          className={previewStyle}
        />
        <Header toggleFullscreen={toggleFullscreen}>
          <CopyCodeButton className={copyCodeButtonStyle} />

          <HeaderButton {...getToggleProps()}>
            <Stack direction="row" space="$space-1">
              <IconCode width={14} height={14} />
              <p>{visible ? 'Hide code' : 'Show code'}</p>
            </Stack>
          </HeaderButton>

          <UnstyledOpenInCodeSandboxButton className={headerButtonStyle}>
            <IconArrowSquareOut width={14} height={14} />
          </UnstyledOpenInCodeSandboxButton>

          <RefreshButton />

          <HeaderButton onClick={toggleFullscreen}>
            <IconCornersOut width={14} height={14} />
          </HeaderButton>
        </Header>
        <div {...getCollapseProps()} className={editorContainerStyle}>
          <SandpackCodeEditor
            data-is-fullscreened={fullscreen}
            className={editorStyle}
          />
        </div>
      </SandpackLayout>
    </SandpackProvider>
  )
}

export interface CodeProps extends React.ComponentPropsWithoutRef<'pre'> {
  files?: Record<string, string>
  dependencies?: Record<string, string>
}
