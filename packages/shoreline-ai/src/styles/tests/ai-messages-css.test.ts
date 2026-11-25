import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'

const css = readFileSync(
  resolve(__dirname, '../components/ai-messages.css'),
  'utf8'
)

/**
 * Returns the body of every `@media (prefers-reduced-motion: reduce)` block,
 * with nested braces balanced.
 */
function reducedMotionBlocks(): string[] {
  const blocks: string[] = []
  const marker = '@media (prefers-reduced-motion: reduce)'
  let from = css.indexOf(marker)

  while (from !== -1) {
    const open = css.indexOf('{', from)
    let depth = 0
    let i = open

    for (; i < css.length; i++) {
      if (css[i] === '{') depth++
      if (css[i] === '}' && --depth === 0) break
    }

    blocks.push(css.slice(open + 1, i))
    from = css.indexOf(marker, i)
  }

  return blocks
}

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

describe('ai-messages.css reduced motion', () => {
  const blocks = reducedMotionBlocks()

  it('declares prefers-reduced-motion blocks', () => {
    expect(blocks.length).toBeGreaterThan(0)
  })

  it('removes the action button and date transitions', () => {
    expect(ruleBody(blocks, '[data-sl-ai-message-action]')).toMatch(
      /transition:\s*none/
    )
    expect(ruleBody(blocks, '[data-sl-ai-message-date]')).toMatch(
      /transition:\s*none/
    )
  })
})

describe('ai-messages.css actions bar', () => {
  it('floats the bar 4px under the message, 20px high with a 2px gap', () => {
    const bar = ruleBody([css], '[data-sl-ai-message-actions] ')

    expect(bar).toContain('position: absolute')
    expect(bar).toContain('top: calc(100% + var(--sl-space-1))')
    expect(bar).toContain('height: var(--sl-space-5)')
    expect(bar).toContain('gap: var(--sl-space-05)')
    expect(bar).toContain('inset-inline-start:')
    expect(bar).not.toMatch(/(^|[^-])left:/)
    expect(css).not.toMatch(/\[data-sl-ai-message-actions\][^{]*\{[^}]*opacity/)
  })

  it('colors a pressed action with the designer token', () => {
    expect(
      ruleBody([css], '[data-sl-ai-message-action][aria-pressed="true"]')
    ).toContain('color: var(--sl-fg-base-soft)')
  })

  it('sizes the Shoreline icons of the bar to 14px', () => {
    const icon = ruleBody([css], '[data-sl-ai-message-action] > svg')

    expect(icon).toContain(
      'width: calc(var(--sl-space-3) + var(--sl-space-05))'
    )
    expect(icon).toContain(
      'height: calc(var(--sl-space-3) + var(--sl-space-05))'
    )
  })

  it('has no rule for a visible "Copied!" text', () => {
    expect(css).not.toContain('[data-sl-ai-message-copy][data-copied]')
  })

  it('raises the gap between messages', () => {
    expect(ruleBody([css], '[data-sl-ai-messages] ')).toContain(
      'gap: var(--sl-ai-messages-gap, var(--sl-space-8))'
    )
  })
})

describe('ai-messages.css reasoning header', () => {
  it('drops the dots loader, the meta and the row rules', () => {
    expect(css).not.toContain('[data-sl-ai-dots-loader]')
    expect(css).not.toContain('[data-sl-ai-message-reasoning-meta]')
    expect(css).not.toContain('[data-sl-ai-message-reasoning-row]')
  })

  it('darkens the chevron on hover with token colors', () => {
    const hover = ruleBody(
      [css],
      '[data-sl-ai-message-reasoning-trigger]:hover'
    )

    expect(hover).toContain('color: var(--sl-color-gray-9)')
    expect(hover).toContain('background: var(--sl-bg-muted-plain-hover)')
  })

  it('shows a keyboard focus ring on the chevron', () => {
    expect(
      ruleBody([css], '[data-sl-ai-message-reasoning-trigger]:focus-visible')
    ).toContain('box-shadow: var(--sl-focus-ring-base)')
  })
})
