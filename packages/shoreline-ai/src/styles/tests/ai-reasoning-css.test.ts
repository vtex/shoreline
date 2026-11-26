import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  resolve(__dirname, '../components/ai-reasoning.css'),
  'utf8'
)

function ruleBody(blocks: string[], selector: string): string {
  const joined = blocks.join('\n')
  const rules = [...joined.matchAll(/([^{}]+)\{([^{}]*)\}/g)]

  return rules
    .filter(([, selectors]) =>
      selectors.replace(/\s+/g, ' ').includes(selector)
    )
    .map(([, , body]) => body)
    .join('\n')
}

describe('ai-reasoning.css header', () => {
  it('drops the dots loader, the meta and the row rules', () => {
    expect(css).not.toContain('[data-sl-ai-dots-loader]')
    expect(css).not.toContain('[data-sl-ai-reasoning-meta]')
    expect(css).not.toContain('[data-sl-ai-reasoning-row]')
  })

  it('grows with a wrapping label: min-height, not a fixed height', () => {
    const header = ruleBody([css], '[data-sl-ai-reasoning-header] ')

    expect(header).toContain('min-height: var(--sl-space-5)')
    expect(header).not.toMatch(/(^|[^-])height:/)
  })

  it('colors the label, the elapsed time and the chevron with the soft foreground', () => {
    expect(ruleBody([css], '[data-sl-ai-reasoning-label]')).toContain(
      'color: var(--sl-fg-base-soft)'
    )
    expect(ruleBody([css], '[data-sl-ai-reasoning-elapsed]')).toContain(
      'color: var(--sl-fg-base-soft)'
    )
    expect(ruleBody([css], '[data-sl-ai-reasoning-trigger] ')).toContain(
      'color: var(--sl-fg-base-soft)'
    )
  })

  it('does not say the trigger sits left of the content', () => {
    // Comments wrap: compare the text with line breaks and stars removed.
    const prose = css.replace(/\s*\n\s*\*?\s*/g, ' ')

    expect(prose).not.toContain('sits left of the content')
  })

  it('darkens the chevron on hover with token colors', () => {
    const hover = ruleBody([css], '[data-sl-ai-reasoning-trigger]:hover')

    expect(hover).toContain('color: var(--sl-color-gray-9)')
    expect(hover).toContain('background: var(--sl-bg-muted-plain-hover)')
  })

  it('shows a keyboard focus ring on the chevron', () => {
    expect(
      ruleBody([css], '[data-sl-ai-reasoning-trigger]:focus-visible')
    ).toContain('box-shadow: var(--sl-focus-ring-base)')
  })

  it('skips the mark enter animation on the group that continues the pending header', () => {
    const glyph = ruleBody(
      [css],
      '[data-sl-ai-reasoning][data-continued] [data-sl-ai-working-mark]'
    )

    expect(glyph).toMatch(/animation:\s*none/)
  })
})
