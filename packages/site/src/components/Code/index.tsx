import React, { useState } from 'react'
import type { Language } from 'prism-react-renderer'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/github'
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live'
import {
  tag,
  Button,
  createSystem,
  ThemeProvider,
  Set,
  Flex,
  IconCode,
  IconDuplicate,
} from '@vtex/admin-ui'

import { copyToClipboard, calculateLinesToHighlight } from './util'
import scope from './LiveCodeScope'
import styles from './styles'

export interface CodeProps {
  codeString: string
  className: string
  highlight?: string
  isStatic?: string | boolean
  isShown?: boolean
  title?: string
  lineNumbers?: string
  noInline?: boolean
}

const system = createSystem('code-preview')
const maxCodeLength = 10

export function Code(props: CodeProps) {
  const {
    codeString,
    className,
    isStatic = false,
    isShown = false,
    highlight,
    title,
    lineNumbers = false,
    noInline = false,
  } = props

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

  const [codeVisible, setCodeVisible] = useState(isShown)

  if (!isStatic) {
    return (
      <ThemeProvider system={system}>
        <LiveProvider
          code={codeString}
          noInline={noInline}
          theme={theme}
          scope={scope}
        >
          <tag.div csx={styles.wrapper}>
            <tag.div as={LivePreview} csx={styles.preview} />
            <Flex
              justify="flex-end"
              csx={{
                padding: 1,
                bg: 'sidebar.light',
                borderBottomRightRadius: 4,
                borderBottomLeftRadius: 4,
              }}
            >
              <Set>
                {codeVisible && (
                  <Button
                    size="small"
                    icon={<IconDuplicate />}
                    variant="adaptative-dark"
                    onClick={handleClick}
                    disabled={copied}
                  >
                    {copied ? 'Copied!' : 'Copy code'}
                  </Button>
                )}
                <Button
                  icon={<IconCode />}
                  variant="adaptative-dark"
                  size="small"
                  onClick={() => setCodeVisible((v) => !v)}
                >
                  Show/Hide Code
                </Button>
              </Set>
            </Flex>
            <tag.div csx={styles.editorWrapper}>
              {codeVisible && <LiveEditor />}
            </tag.div>
            <tag.div as={LiveError} csx={styles.liveEditor} />
          </tag.div>
        </LiveProvider>
      </ThemeProvider>
    )
  }

  return (
    <ThemeProvider system={system}>
      {title && <tag.div csx={styles.preHeader}>{title}</tag.div>}
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
            <tag.pre
              csx={{
                borderRadius: `${title ? '0 0 4px 4px' : '4px'}`,
                padding: `${language ? `2rem` : `1rem`} 1rem 1rem 1rem`,
                ...styles.pre,
              }}
              className={blockClassName}
              style={style}
            >
              <Button
                size="small"
                icon={<IconCode />}
                variant="adaptative-dark"
                onClick={handleClick}
                disabled={copied}
                csx={styles.copyButton}
              >
                {copied ? 'Copied!' : 'Copy code'}
              </Button>
              <tag.code
                csx={{
                  position: 'relative',
                }}
              >
                {tokens
                  .slice(
                    0,
                    tokens.length > maxCodeLength && !codeVisible
                      ? maxCodeLength
                      : tokens.length
                  )
                  .map((line, index) => {
                    const lineProps = getLineProps({ line, key: index })

                    if (shouldHighlightLine(index)) {
                      lineProps.className = `${lineProps.className} highlight-line`
                    }

                    return (
                      <div {...lineProps}>
                        {lineNumbers && (
                          <tag.span csx={styles.lineNo}>{index + 1}</tag.span>
                        )}
                        {line.map((token, key) => (
                          <span {...getTokenProps({ token, key })} />
                        ))}
                      </div>
                    )
                  })}
                {tokens.length > maxCodeLength && (
                  <Button
                    variant="adaptative-dark"
                    csx={{
                      width: '100%',
                      zIndex: 2,
                    }}
                    onClick={() => setCodeVisible((v) => !v)}
                  >
                    {codeVisible ? 'Hide' : 'Show'} Code
                  </Button>
                )}
                {tokens.length > maxCodeLength && !codeVisible && (
                  <tag.div
                    csx={{
                      height: '20rem',
                      width: '100%',
                      background:
                        'linear-gradient(0deg, rgba(247,247,247,1) 0%, rgba(247,247,247,.1) 50%)',
                      position: 'absolute',
                      bottom: 0,
                      zIndex: 1,
                    }}
                  />
                )}
              </tag.code>
            </tag.pre>
          )}
        </Highlight>
      </div>
    </ThemeProvider>
  )
}
