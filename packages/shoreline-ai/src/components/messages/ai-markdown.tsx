import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Text, forwardRef } from '@vtex/shoreline'
import type { Components } from 'react-markdown'

import type { AIMarkdownProps } from './types'

const markdownComponents: Components = {
  p: ({ children }) => (
    <Text as="p" variant="body" data-sl-ai-markdown-text>
      {children}
    </Text>
  ),
  h1: ({ children }) => (
    <Text as="div" variant="display3" data-sl-ai-markdown-heading>
      {children}
    </Text>
  ),
  h2: ({ children }) => (
    <Text as="div" variant="display4" data-sl-ai-markdown-heading>
      {children}
    </Text>
  ),
  h3: ({ children }) => (
    <Text as="div" variant="action" data-sl-ai-markdown-heading>
      {children}
    </Text>
  ),
  li: ({ children }) => (
    <Text as="li" variant="body" data-sl-ai-markdown-list-item>
      {children}
    </Text>
  ),
  code: ({ children }) => <code data-sl-ai-markdown-code>{children}</code>,
  pre: ({ children }) => <pre data-sl-ai-markdown-pre>{children}</pre>,
  a: ({ href, children }) => (
    <a href={href} data-sl-ai-markdown-link>
      {children}
    </a>
  ),
}

/**
 * Generic markdown renderer for Shoreline AI surfaces.
 *
 * @status experimental
 */
export const AIMarkdown = forwardRef<HTMLDivElement, AIMarkdownProps>(
  function AIMarkdown(props, ref) {
    const { children, ...divProps } = props

    return (
      <div ref={ref} data-sl-ai-markdown {...divProps}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={markdownComponents}
        >
          {children}
        </ReactMarkdown>
      </div>
    )
  }
)
