import { Highlight, themes } from 'prism-react-renderer'
import { LiveEditor, LiveError, LivePreview, LiveProvider } from 'react-live'
import type { PropsWithChildren } from 'react'
import React, { isValidElement } from 'react'
import ReactDOMServer from 'react-dom/server'
import he from 'he'

/**
 * Scope
 */
import * as ShorelineComponents from '@vtex/shoreline-components'
import * as ShorelineDate from '@vtex/shoreline-date'

import styles from './pre.module.css'

export function Pre(props: PropsWithChildren) {
  const children = props.children as JSX.Element
  const options = children.props.className.split('-')
  const language = options[1]
  const live = language === 'jsx'
  const code = he.decode(ReactDOMServer.renderToString(children.props.children))

  if (live && isValidElement(props.children)) {
    return (
      <LiveProvider
        code={code}
        language={language}
        scope={{ React, ...ShorelineComponents, ...ShorelineDate }}
        enableTypeScript
        theme={themes.github}
      >
        <div className={styles.livePre}>
          <div className={styles.livePreview}>
            <LivePreview />
          </div>
          <LiveError />
          <LiveEditor
            code={code}
            language={language}
            className={styles.liveEditor}
          />
        </div>
      </LiveProvider>
    )
  }

  return (
    <Highlight theme={themes.github} code={code} language={language}>
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre style={{ ...style }} className={styles.codeBlock}>
          {tokens.map((line, i) => {
            if (line[0].empty) return

            return (
              <div key={i} {...getLineProps({ line })}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            )
          })}
        </pre>
      )}
    </Highlight>
  )
}
