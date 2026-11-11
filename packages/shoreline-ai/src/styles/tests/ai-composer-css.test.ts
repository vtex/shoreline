import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  resolve(__dirname, '../components/ai-composer.css'),
  'utf8'
)

/**
 * Joins the declaration blocks of every rule whose selector list contains
 * the given selector exactly. The stylesheet is flat inside one @layer.
 */
function declarationsFor(selector: string): string {
  const rules = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]

  return rules
    .filter(([, selectors]) =>
      selectors
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .split(',')
        .map((item) => item.trim())
        .includes(selector)
    )
    .map(([, , body]) => body)
    .join('\n')
}

/** Joins the declaration blocks of every rule whose selector mentions the fragment. */
function declarationsMatching(fragment: string): string {
  return [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)]
    .filter(([, selectors]) =>
      selectors.replace(/\s+/g, ' ').includes(fragment)
    )
    .map(([, , body]) => body)
    .join('\n')
}

describe('ai-composer.css', () => {
  it('pill uses the gray-2 fill and no border', () => {
    const field = declarationsFor('[data-sl-ai-composer-field]')

    expect(field).toContain('var(--sl-color-gray-2)')
    expect(field).not.toMatch(/border:\s*1px solid/)
  })

  it('pill shows a focus ring on focus-within', () => {
    const focus = declarationsFor('[data-sl-ai-composer-field]:focus-within')

    expect(focus).toContain('var(--sl-focus-ring-base)')
    expect(focus).not.toContain('outline: none')
  })

  it('radius keeps the Sunrise fallback', () => {
    expect(css).toContain('var(--sl-radius-4, 1.5rem)')
  })

  it('stop button is blue', () => {
    expect(declarationsMatching('[data-sl-ai-composer-cancel]')).toContain(
      'var(--sl-color-blue-10)'
    )
  })

  it('defines a rule per layout', () => {
    for (const layout of ['stacked', 'expanded', 'inline']) {
      expect(css).toContain(`[data-layout="${layout}"]`)
    }
  })

  it('footer uses display contents in expanded and inline', () => {
    for (const layout of ['expanded', 'inline']) {
      expect(
        declarationsMatching(
          `[data-layout="${layout}"] [data-sl-ai-composer-footer]`
        )
      ).toContain('display: contents')
    }
  })

  it('inline centers the start slot and the actions on the row', () => {
    expect(
      declarationsMatching(
        '[data-layout="inline"] [data-sl-ai-composer-footer] > *'
      )
    ).toContain('align-self: center')
  })

  it('inline lets the textarea size to its content so the text centers', () => {
    expect(
      declarationsMatching('[data-layout="inline"] [data-sl-textarea] textarea')
    ).toContain('min-height: 0')
  })

  it('inline centers the textarea box on the row', () => {
    expect(
      declarationsFor(
        '[data-sl-ai-composer][data-layout="inline"] [data-sl-textarea]'
      )
    ).toContain('align-self: center')
  })

  it('the root exposes the overlap variable to the header and the field', () => {
    expect(declarationsFor('[data-sl-ai-composer]')).toContain(
      '--sl-ai-composer-overlap: var(--sl-radius-4, 1.5rem)'
    )
    expect(
      declarationsMatching(
        '[data-sl-ai-composer-header]:not(:empty) + [data-sl-ai-composer-field]'
      )
    ).toContain('var(--sl-ai-composer-overlap)')
  })

  it('the context band covers the overlap zone through the variable', () => {
    expect(declarationsFor('[data-sl-ai-composer-context-items]')).toContain(
      'var(--sl-ai-composer-overlap, 1.5rem)'
    )
  })

  it('the textarea grows with its content when the app supplies it', () => {
    expect(
      declarationsMatching(
        '[data-sl-ai-composer-field] [data-sl-textarea] textarea'
      )
    ).toContain('field-sizing: content')
  })

  it('disabled send uses the Design colors', () => {
    const disabled = declarationsMatching('[data-sl-ai-composer-send]:disabled')

    expect(disabled).toContain('var(--sl-color-gray-3)')
    expect(disabled).toContain('var(--sl-fg-base-soft)')
  })

  it('an empty attachments row adds no spacing', () => {
    expect(
      declarationsFor(
        '[data-sl-ai-composer-field] > [data-sl-ai-composer-attachments]:empty'
      )
    ).toContain('margin-bottom: 0')
  })

  it('inline keeps the minimum height token', () => {
    expect(
      declarationsMatching('[data-layout="inline"] [data-sl-ai-composer-field]')
    ).toContain('var(--sl-space-16)')
  })

  it('context band uses gray-1', () => {
    expect(declarationsFor('[data-sl-ai-composer-context-items]')).toContain(
      'var(--sl-color-gray-1)'
    )
  })

  it('skeleton is one gray-2 pill that stops animating on reduced motion', () => {
    const pill = declarationsMatching(
      '[data-sl-skeleton][data-sl-ai-composer-skeleton-pill]'
    )

    expect(pill).toContain('var(--sl-color-gray-2)')
    expect(pill).toContain('var(--sl-radius-4, 1.5rem)')
    expect(css).toContain('prefers-reduced-motion: reduce')
  })

  it('has no leftover token TODOs', () => {
    expect(css).not.toMatch(/TODO\(token\)/)
  })
})
