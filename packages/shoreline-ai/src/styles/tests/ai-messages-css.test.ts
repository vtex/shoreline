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

  it('stops the dots loader animation', () => {
    expect(ruleBody(blocks, '[data-sl-ai-dots-loader]')).toMatch(
      /animation:\s*none/
    )
  })

  it('removes the actions row transition', () => {
    expect(ruleBody(blocks, '[data-sl-ai-message-actions]')).toMatch(
      /transition:\s*none/
    )
  })
})
