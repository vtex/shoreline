/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import {
  PlaygroundPreview,
  PlaygroundEditor,
  usePlaygroundState,
  PlaygroundStateReturn,
} from 'reakit-playground'
import * as emotion from 'emotion'
import * as styled from 'styled-components'
import * as AdminUI from '@vtex/admin-ui'
import * as System from '@vtex/admin-ui-system'
import * as AdminIcons from '@vtex/admin-ui-icons'

function getChildrenCode(props: { children?: React.ReactNode }) {
  const children = React.Children.toArray(props.children)
  const [code] = children

  if (code && typeof code === 'object' && 'type' in code) {
    return code.type === 'code' ? code : null
  }

  return null
}

interface PlaygroundProps {
  dynamic: boolean
  mode: string
  state: PlaygroundStateReturn
  maxHeight?: string
}

function Playground({
  dynamic,
  mode,
  state,
  maxHeight,
  ...props
}: PlaygroundProps) {
  return (
    <>
      {dynamic && (
        <PlaygroundPreview
          unstyled
          modules={{
            '@vtex/admin-ui': AdminUI,
            '@vtex/admin-ui-icons': AdminIcons,
            '@vtex/admin-ui-system': System,
            emotion,
            'styled-components': styled,
          }}
          {...state}
        />
      )}
      <PlaygroundEditor
        readOnly={!dynamic}
        mode={mode}
        maxHeight={maxHeight}
        {...state}
        {...props}
      />
    </>
  )
}

export default function CodeBlock(props: React.HTMLAttributes<unknown>) {
  const codeElement = getChildrenCode(props)

  const { static: isStatic, maxHeight, className } = codeElement?.props

  const [, language] = className.match(/language-(.+)/) ?? []

  const modeMap = {
    html: 'htmlmixed',
    js: 'javascript',
  }

  const mode = modeMap?.[language as keyof typeof modeMap] ?? language

  const isDynamic = !isStatic && mode === 'jsx'

  const [code] = codeElement?.props?.children
  const state = usePlaygroundState({ code })

  React.useEffect(() => {
    state.update(code)
  }, [state.update, code])

  return codeElement ? (
    <Playground
      state={state}
      mode={mode}
      dynamic={isDynamic}
      maxHeight={maxHeight}
      {...props}
    />
  ) : (
    <pre {...props} />
  )
}
