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
  it('keeps the bar in the flow, 24px high with a 2px gap', () => {
    const bar = ruleBody([css], '[data-sl-ai-message-actions] ')

    expect(bar).not.toContain('position:')
    expect(bar).not.toContain('top:')
    expect(bar).toContain('height: var(--sl-space-6)')
    expect(bar).toContain('gap: var(--sl-space-05)')
    expect(bar).toContain('margin-inline-start:')
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

  it('scales the stroke of the bar icons with the icon, as the designer page does', () => {
    expect(
      ruleBody(
        [css],
        '[data-sl-ai-message-action] > svg :is(path, rect, circle, line, polyline, polygon, ellipse)'
      )
    ).toContain('vector-effect: none')
  })

  it('places the date 10px after the buttons', () => {
    expect(ruleBody([css], '[data-sl-ai-message-date] ')).toContain(
      'margin-inline-start: calc(var(--sl-space-2) + var(--sl-space-05))'
    )
  })

  it('has no rule for a visible "Copied!" text', () => {
    expect(css).not.toContain('[data-sl-ai-message-copy][data-copied]')
  })

  it('sizes the bar buttons to 24px', () => {
    const action = ruleBody([css], '[data-sl-ai-message-action] ')

    expect(action).toContain('min-width: var(--sl-space-6)')
    expect(action).toContain('height: var(--sl-space-6)')
  })

  it('places the blocks of an answer 12px apart', () => {
    expect(
      ruleBody(
        [css],
        '[data-sl-ai-message][data-sl-ai-message-role="assistant"] [data-sl-ai-message-parts]'
      )
    ).toContain('gap: var(--sl-space-3)')
  })

  it('reserves no room for a floating bar in the message row', () => {
    const row = ruleBody([css], '[data-sl-ai-message] ')

    expect(row).toContain('padding: var(--sl-space-2) var(--sl-space-4);')
    expect(row).not.toContain('--sl-space-6')
  })

  it('keeps room below the list and takes its padding from the thread', () => {
    const list = ruleBody([css], '[data-sl-ai-messages] ')

    expect(list).toContain('box-sizing: border-box')
    expect(list).toContain('padding: var(--sl-ai-messages-padding, 0)')
    expect(list).toContain(
      'padding-block-end: var(--sl-ai-messages-gap, var(--sl-space-3))'
    )
  })

  it('colors the bar icons with the soft foreground', () => {
    expect(ruleBody([css], '[data-sl-ai-message-action] ')).toContain(
      'color: var(--sl-fg-base-soft)'
    )
  })

  it('does not apply the hover look to a disabled action', () => {
    expect(css).toContain(
      '[data-sl-ai-message-action]:hover:where(:not(:disabled))'
    )
    expect(css).not.toMatch(/\[data-sl-ai-message-action\]:hover\s*[,{]/)
  })

  it('places messages 12px apart', () => {
    expect(ruleBody([css], '[data-sl-ai-messages] ')).toContain(
      'gap: var(--sl-ai-messages-gap, var(--sl-space-3))'
    )
  })
})

describe('ai-messages.css thinking indicator', () => {
  it('shimmers over the soft foreground', () => {
    const shimmer = ruleBody([css], '[data-sl-ai-thinking-indicator] ')

    expect(shimmer).toContain('var(--sl-fg-base-soft) 0%')
    expect(shimmer).toContain('var(--sl-color-gray-4) 50%')
    expect(shimmer).not.toContain('--sl-color-gray-8')
  })

  it('leaves the reasoning rules to ai-reasoning.css', () => {
    expect(css).not.toContain('[data-sl-ai-reasoning')
  })
})
