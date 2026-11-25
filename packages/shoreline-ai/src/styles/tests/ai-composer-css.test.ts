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
  it('card is white with a thin border, a soft shadow and 8px of padding', () => {
    const field = declarationsFor('[data-sl-ai-composer-field]')

    expect(field).toContain('background: var(--sl-bg-base)')
    expect(field).toContain('border: var(--sl-border-base)')
    expect(field).toContain('var(--sl-ai-composer-shadow)')
    expect(field).toContain('padding: var(--sl-space-2)')
    expect(field).toContain('border-radius: var(--sl-ai-composer-radius)')
    expect(declarationsFor('[data-sl-ai-composer]')).toContain(
      '--sl-ai-composer-radius: 1.25rem'
    )
  })

  it('the card draws the focus ring only for keyboard focus', () => {
    expect(css).not.toContain('[data-sl-ai-composer-field]:focus-within')
    expect(
      declarationsFor('[data-sl-ai-composer-field][data-focus-visible]')
    ).toContain('box-shadow: var(--sl-focus-ring-base)')
  })

  it('keeps the inline text inset, so the caret is not clipped', () => {
    expect(css).not.toMatch(
      /\[data-layout="inline"\] \[data-sl-textarea-input\][^{]*\{[^}]*padding-inline:\s*0/
    )
  })

  it('send and stop are blue 32px circles (28px inline) with a darker hover', () => {
    const controls = declarationsMatching('[data-sl-ai-composer-send],')

    expect(controls).toContain('var(--sl-bg-accent-strong)')
    expect(controls).toContain('var(--sl-fg-inverted)')
    expect(controls).toContain('width: var(--sl-space-8)')
    expect(
      declarationsMatching('[data-sl-ai-composer-send]:not(:disabled)')
    ).toContain('var(--sl-bg-accent-strong-hover)')
  })

  it('the add attachment button is 32px with a gray-2 hover', () => {
    const add = declarationsFor(
      '[data-sl-icon-button][data-sl-ai-composer-add-attachment]'
    )

    expect(add).toContain('width: var(--sl-space-8)')
    expect(add).toContain('var(--sl-fg-muted)')
    expect(
      declarationsMatching('[data-sl-ai-composer-add-attachment]:hover')
    ).toContain('var(--sl-ai-composer-bg-muted)')
  })

  it('defines a rule per layout', () => {
    for (const layout of ['stacked', 'inline']) {
      expect(css).toContain(`[data-layout="${layout}"]`)
    }
  })

  it('footer uses display contents in inline', () => {
    expect(
      declarationsMatching(
        '[data-layout="inline"] [data-sl-ai-composer-footer]'
      )
    ).toContain('display: contents')
  })

  it('has no expanded layout', () => {
    expect(css).not.toContain('[data-layout="expanded"]')
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
    expect(css).toContain(
      '--sl-ai-composer-overlap: var(--sl-ai-composer-radius)'
    )
    expect(
      declarationsMatching(
        '[data-sl-ai-composer-header]:not(:empty) + [data-sl-ai-composer-field]'
      )
    ).toContain('var(--sl-ai-composer-overlap)')
  })

  it('the context band covers the overlap zone through the variable', () => {
    expect(declarationsFor('[data-sl-ai-composer-context-items]')).toContain(
      'var(--sl-ai-composer-overlap)'
    )
  })

  it('the textarea grows with its content when the app supplies it', () => {
    expect(
      declarationsMatching(
        '[data-sl-ai-composer-field] [data-sl-textarea] textarea'
      )
    ).toContain('field-sizing: content')
  })

  it('empty send turns gray, as the disabled state', () => {
    const disabled = declarationsMatching('[data-sl-ai-composer-send]:disabled')

    expect(disabled).toContain('var(--sl-ai-composer-bg-muted)')
    expect(disabled).toContain('var(--sl-ai-composer-fg-muted)')
    expect(disabled).not.toContain('opacity')
  })

  it('an empty attachments row adds no spacing', () => {
    expect(
      declarationsFor(
        '[data-sl-ai-composer-field] > [data-sl-ai-composer-attachments]:empty'
      )
    ).toContain('margin-block: 0')
  })

  it('context band uses the soft base background', () => {
    expect(declarationsFor('[data-sl-ai-composer-context-items]')).toContain(
      'var(--sl-bg-base-soft)'
    )
  })

  it('attachments stay on one row and wrap only when expanded', () => {
    expect(
      declarationsFor(
        '[data-sl-ai-composer-field] > [data-sl-ai-composer-attachments]'
      )
    ).toContain('flex-wrap: nowrap')
    expect(
      declarationsMatching('[data-sl-ai-composer-attachments][data-expanded]')
    ).toContain('flex-wrap: wrap')
  })

  it('image tiles and the "+N" button are 80px', () => {
    for (const selector of [
      '[data-sl-ai-composer-attachment-image]',
      '[data-sl-ai-composer-attachments-more]',
    ]) {
      expect(declarationsFor(selector)).toContain('width: var(--sl-space-20)')
      expect(declarationsFor(selector)).toContain('height: var(--sl-space-20)')
    }
  })

  it('the document card is 80px high and 124px wide', () => {
    const card = declarationsFor('[data-sl-ai-composer-attachment-card]')

    expect(card).toContain('width: 7.75rem')
    expect(card).toContain('height: var(--sl-space-20)')
  })

  it('the file type tag is a 16px micro label', () => {
    const tag = declarationsFor('[data-sl-ai-composer-attachment-tag]')

    expect(tag).toContain('9px / 1')
    expect(tag).toContain('letter-spacing: 0.04em')
    expect(tag).toContain('border-radius: 0.25rem')
    expect(tag).toContain('padding: 0 var(--sl-space-1)')
  })

  it('sizes come from tokens, not from calc() sums of them', () => {
    const sizing = css.match(/(?:min-|max-)?(?:height|width):\s*calc\([^;]*;/g)

    expect(sizing).toBeNull()
  })

  it('only the tiles an expansion reveals animate', () => {
    expect(css).toContain('[data-sl-ai-composer-attachment][data-overflow]')
  })

  it('a failed attachment uses the critical border token', () => {
    expect(declarationsMatching('[data-status="error"]')).toContain(
      'var(--sl-border-critical-strong)'
    )
  })

  it('the remove button shows only on hover or focus, and always on touch', () => {
    expect(
      declarationsFor(
        '[data-sl-icon-button][data-sl-ai-composer-attachment-remove]'
      )
    ).toContain('opacity: 0')
    expect(css).toContain('@media (hover: none)')
    expect(
      declarationsMatching(
        '[data-sl-ai-composer-attachment]:hover [data-sl-icon-button][data-sl-ai-composer-attachment-remove]'
      )
    ).toContain('opacity: 1')
  })

  it('the "+N" focus ring is a box-shadow, because the token is a shadow', () => {
    const focus = declarationsMatching(
      '[data-sl-ai-composer-attachments-more]:focus-visible'
    )

    expect(focus).toContain('box-shadow: var(--sl-focus-ring-base)')
    expect(focus).not.toMatch(/outline:\s*\d/)
  })

  it('the expand animation only runs without a reduced motion preference', () => {
    expect(css).toContain('@media (prefers-reduced-motion: no-preference)')
    expect(css).toContain('@keyframes sl-ai-composer-attachment-in')
    expect(css).toContain('@keyframes sl-ai-composer-attachments-more-label-in')
  })

  it('skeleton is one gray-2 pill that stops animating on reduced motion', () => {
    const pill = declarationsMatching(
      '[data-sl-skeleton][data-sl-ai-composer-skeleton-pill]'
    )

    expect(pill).toContain('var(--sl-ai-composer-bg-muted)')
    expect(pill).toContain('var(--sl-ai-composer-radius)')
    expect(pill).toContain('height: 5.125rem')
    expect(css).toContain('prefers-reduced-motion: reduce')
  })

  it('names the two grays no semantic token has, once', () => {
    expect(css).toContain('--sl-ai-composer-bg-muted: var(--sl-color-gray-2)')
    expect(css).toContain('--sl-ai-composer-fg-muted: var(--sl-color-gray-6)')
    expect(css.match(/var\(--sl-color-gray-[26]\)/g)).toHaveLength(3)
  })

  it('has no leftover token TODOs', () => {
    expect(css).not.toMatch(/TODO\(token\)/)
  })
})
