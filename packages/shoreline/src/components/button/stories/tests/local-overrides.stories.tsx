import { userEvent, within, expect } from '@storybook/test'
import type { StoryContext } from '@storybook/react'
import { Button } from '../../index'
import './local-overrides.css'

export default {
  title: 'components/button/tests',
  parameters: { chromatic: { disableSnapshot: true } },
  play: async ({ canvasElement }: StoryContext) => {
    const canvas = within(canvasElement)
    const primary = canvas.getByRole('button', { name: 'Local primary' })
    const secondary = canvas.getByRole('button', { name: 'Local secondary' })
    const reference = getComputedStyle(
      canvas.getByTestId('local-token-reference')
    )
    const primaryStyle = getComputedStyle(primary)
    const horizon =
      getComputedStyle(document.documentElement)
        .getPropertyValue('--sl-button-font-weight')
        .trim() === '550'

    await userEvent.tab()
    await expect(primary).toHaveFocus()
    if (horizon) {
      // Horizon deliberately defines Button-specific values; ordinary semantic
      // overrides must not displace those explicit theme decisions.
      await expect(primaryStyle.backgroundColor).toBe('rgb(3, 102, 221)')
      await expect(primaryStyle.fontWeight).toBe('550')
    } else {
      // A root alias would capture the old token values and fail these checks.
      await expect(primaryStyle.backgroundColor).toBe(reference.backgroundColor)
      await expect(primaryStyle.fontWeight).toBe(reference.fontWeight)
      await expect(primaryStyle.letterSpacing).toBe(reference.letterSpacing)
      await expect(primaryStyle.paddingTop).toBe(reference.paddingTop)
      await expect(primaryStyle.boxShadow).toBe(reference.boxShadow)
      await expect(getComputedStyle(secondary).backgroundColor).toBe(
        getComputedStyle(canvas.getByTestId('local-muted-reference'))
          .backgroundColor
      )
    }
  },
}

export function LocalOverrides() {
  return (
    <section className="button-local-overrides">
      <h2>Local semantic overrides</h2>
      <p>
        Sunrise resolves local semantic tokens. Horizon keeps its explicit
        Button tokens.
      </p>
      <Button variant="primary">Local primary</Button>
      <Button>Local secondary</Button>
      <div
        data-testid="local-token-reference"
        className="button-local-token-reference"
      >
        Semantic token reference
      </div>
      <div
        data-testid="local-muted-reference"
        className="button-local-muted-reference"
      >
        Muted token reference
      </div>
    </section>
  )
}
