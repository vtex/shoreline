import { createRef } from 'react'
import {
  describe,
  expect,
  it,
  render,
  userEvent,
  vi,
} from '@vtex/shoreline-test-utils'
import { IconPlus } from '../../../icons'
import { IconButton } from '../index'

describe('IconButton', () => {
  it('has an accessible name, forwards ref and ARIA, and keeps the icon decorative', () => {
    const ref = createRef<HTMLButtonElement>()
    const { getByRole, container } = render(
      <IconButton label="Add attachment" ref={ref} aria-expanded={false}>
        <IconPlus />
      </IconButton>
    )
    const button = getByRole('button', { name: 'Add attachment' })
    expect(ref.current).toBe(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(container.querySelector('svg')).toHaveAttribute(
      'aria-hidden',
      'true'
    )
    expect(button).toHaveAttribute('data-size', 'normal')
    expect(button).toHaveAttribute('data-shape', 'default')
  })

  it('uses the shared compact, rounded and outline API and activates from the keyboard', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const { getByRole } = render(
      <IconButton
        label="Add attachment"
        shape="rounded"
        size="small"
        variant="outline"
        onClick={onClick}
      >
        <IconPlus />
      </IconButton>
    )
    const button = getByRole('button', { name: 'Add attachment' })
    expect(button).toHaveAttribute('data-shape', 'rounded')
    expect(button).toHaveAttribute('data-size', 'small')
    expect(button).toHaveAttribute('data-variant', 'outline')
    await user.tab()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(onClick).toHaveBeenCalledTimes(1)
    await user.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it.each(['loading', 'disabled'] as const)(
    'retains its name and blocks activation while %s',
    async (state) => {
      const onClick = vi.fn()
      const user = userEvent.setup()
      const { getByRole } = render(
        <IconButton
          label="Send message"
          variant="success"
          shape="rounded"
          loading={state === 'loading'}
          disabled={state === 'disabled'}
          onClick={onClick}
        >
          <IconPlus />
        </IconButton>
      )
      const button = getByRole('button', { name: /Send message/ })
      expect(button).toBeDisabled()
      expect(button).toHaveAttribute('aria-busy', String(state === 'loading'))
      button.click()
      await user.tab()
      expect(button).not.toHaveFocus()
      expect(onClick).not.toHaveBeenCalled()
    }
  )
})
