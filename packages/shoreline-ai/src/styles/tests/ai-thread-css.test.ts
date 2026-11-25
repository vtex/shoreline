import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  resolve(__dirname, '../components/ai-thread.css'),
  'utf8'
)

function rule(selector: string): string {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
  const match = rules.find(
    ([, sel]) =>
      sel
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/\s+/g, ' ')
        .trim() === selector
  )

  if (!match) throw new Error(`rule not found: ${selector}`)

  return match[2].replace(/\s+/g, ' ')
}

describe('ai-thread.css layout', () => {
  it('pushes the footer to the bottom of a short thread', () => {
    const footer = rule('[data-sl-ai-thread-viewport-footer]')

    expect(footer).toContain('position: sticky')
    expect(footer).toContain('margin-top: auto')
    expect(footer).toContain(
      'padding: 0 var(--sl-ai-thread-padding, var(--sl-space-4)) var(--sl-ai-thread-padding, var(--sl-space-4))'
    )
  })

  it('hands the thread padding to the messages through a custom property', () => {
    expect(rule('[data-sl-ai-thread-viewport]')).toContain(
      '--sl-ai-messages-padding: var(--sl-ai-thread-padding, var(--sl-space-4))'
    )
  })

  it('has no direct-child rule for the messages', () => {
    expect(css).not.toMatch(
      /\[data-sl-ai-thread-viewport\]\s*>\s*\[data-sl-ai-messages\]/
    )
  })

  it('fills and centers the empty state', () => {
    const empty = rule('[data-sl-ai-thread-empty]')

    expect(empty).toContain('flex: 1')
    expect(empty).toContain('flex-direction: column')
    expect(empty).toContain('align-items: center')
    expect(empty).toContain('justify-content: center')
  })
})
