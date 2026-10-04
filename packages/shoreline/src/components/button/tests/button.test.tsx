import { createRef } from 'react'
import {
  describe,
  expect,
  it,
  render,
  userEvent,
  vi,
} from '@vtex/shoreline-test-utils'
import { Button } from '../index'

describe('Button', () => {
  it('preserves default appearance, native semantics, ref and ARIA props', () => {
    const ref = createRef<HTMLButtonElement>()
    const { getByRole } = render(
      <Button ref={ref} aria-describedby="help">
        Continue
      </Button>
    )
    const button = getByRole('button', { name: 'Continue' })
    expect(ref.current).toBe(button)
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveAttribute('data-size', 'normal')
    expect(button).toHaveAttribute('data-shape', 'default')
    expect(button).toHaveAttribute('data-variant', 'secondary')
    expect(button).toHaveAttribute('aria-describedby', 'help')
  })

  it('accepts compact rounded success without leaking API props to the DOM', () => {
    const { getByRole } = render(
      <Button size="small" shape="rounded" variant="success">
        Approve
      </Button>
    )
    const button = getByRole('button', { name: 'Approve' })
    expect(button).toHaveAttribute('data-size', 'small')
    expect(button).toHaveAttribute('data-shape', 'rounded')
    expect(button).toHaveAttribute('data-variant', 'success')
    expect(button).not.toHaveAttribute('shape')
    expect(button).not.toHaveAttribute('variant')
  })

  it('activates compact outline exactly once per Enter or Space press', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <Button size="small" variant="outline" onClick={onClick}>
        Open chat
      </Button>
    )
    await user.tab()
    expect(getByRole('button', { name: 'Open chat' })).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it.each(['loading', 'disabled'] as const)(
    'blocks activation when %s and preserves the accessible name',
    async (state) => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      const { getByRole } = render(
        <Button
          loading={state === 'loading'}
          disabled={state === 'disabled'}
          shape="rounded"
          variant="success"
          onClick={onClick}
        >
          Approve
        </Button>
      )
      const button = getByRole('button', { name: /Approve/ })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', String(state === 'loading'))
      button.click()
      await user.tab()
      expect(button).not.toHaveFocus()
      expect(onClick).not.toHaveBeenCalled()
    }
  )

  it('preserves anchor composition, ref and ARIA in the new shape', () => {
    let element: HTMLButtonElement | null = null
    const { getByRole } = render(
      <Button
        asChild
        shape="rounded"
        variant="outline"
        aria-label="Read the guide"
        ref={(node) => {
          element = node
        }}
      >
        <a href="#guide">Guide</a>
      </Button>
    )
    const link = getByRole('link', { name: 'Read the guide' })
    expect(element).toBe(link)
    expect(link).toHaveAttribute('href', '#guide')
    expect(link).toHaveAttribute('data-shape', 'rounded')
  })
})
