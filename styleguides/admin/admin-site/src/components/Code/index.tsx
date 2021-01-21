/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-filename-extension */
import React, { useState } from 'react'
import Highlight, { defaultProps, Language } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/dracula'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import { Box, Button, useSystem } from '@vtex/admin-ui'

import { copyToClipboard, calculateLinesToHighlight } from './util'
import scope from './LiveCodeScope'
import styles from './styles'

export interface CodeProps {
  codeString: string
  className: string
  highlight?: string
  isStatic?: string | boolean
  title?: string
  lineNumbers?: string
  noInline?: boolean
}

export function Code(props: CodeProps) {
  const {
    codeString,
    className,
    isStatic = false,
    highlight,
    title,
    lineNumbers,
    noInline = false,
  } = props

  const { cn, cx } = useSystem()
  const [copied, setCopied] = useState(false)
  const language = className?.replace(/language-/, '')

  const shouldHighlightLine = calculateLinesToHighlight(highlight)

  const handleClick = () => {
    setCopied(true)
    copyToClipboard(codeString)

    setTimeout(() => {
      setCopied(false)
    }, 4000)
  }

  if (!isStatic) {
    return (
      <LiveProvider
        code={codeString}
        noInline={noInline}
        theme={theme}
        scope={scope}
      >
        <Box styles={styles.wrapper}>
          <LivePreview className={cn(styles.preview)} />

          <Box styles={styles.editorWrapper}>
            <Button
              size="small"
              variant="adaptative-light"
              onClick={handleClick}
              disabled={copied}
              styleOverrides={styles.copyButton}
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>

            <LiveEditor />
          </Box>

          <LiveError className={cn(styles.liveEditor)} />
        </Box>
      </LiveProvider>
    )
  }

  return (
    <>
      {title && <Box styles={styles.preHeader}>{title}</Box>}
      <div className="gatsby-highlight">
        <Highlight
          {...defaultProps}
          code={codeString}
          language={language as Language}
          theme={theme}
        >
          {({
            className: blockClassName,
            style,
            tokens,
            getLineProps,
            getTokenProps,
          }) => (
            <pre
              className={cx(
                cn({
                  borderRadius: `${title ? '0 0 5px 5px' : '5px'}`,
                  padding: `${language ? `2rem` : `1rem`} 1rem 1rem 1rem`,
                  ...styles.pre,
                }),
                blockClassName
              )}
              style={style}
            >
              <Button
                size="small"
                variant="adaptative-light"
                onClick={handleClick}
                disabled={copied}
                styleOverrides={styles.copyButton}
              >
                {copied ? 'Copied!' : 'Copy'}
              </Button>
              <code>
                {tokens.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index })

                  if (shouldHighlightLine(index)) {
                    lineProps.className = `${lineProps.className} highlight-line`
                  }

                  return (
                    <div {...lineProps}>
                      {lineNumbers && (
                        <Box element="span" styles={styles.lineNo}>
                          {index + 1}
                        </Box>
                      )}
                      {line.map((token, key) => (
                        <span {...getTokenProps({ token, key })} />
                      ))}
                    </div>
                  )
                })}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
    </>
  )
}
