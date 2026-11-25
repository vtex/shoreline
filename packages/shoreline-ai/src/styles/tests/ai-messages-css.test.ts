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

  it('removes the actions row transition', () => {
    expect(ruleBody(blocks, '[data-sl-ai-message-actions]')).toMatch(
      /transition:\s*none/
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
