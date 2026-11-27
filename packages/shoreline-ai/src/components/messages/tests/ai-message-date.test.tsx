import {
  act,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  render,
} from '@vtex/shoreline-test-utils'
import { LocaleProvider } from '@vtex/shoreline'
import { renderToString } from 'react-dom/server'
import { vi } from 'vitest'

import { AIMessageDate } from '../ai-message-date'
import { AIMessagesI18nProvider } from '../message-messages-context'

const aui = vi.hoisted(() => ({ createdAt: undefined as unknown }))

vi.mock('@assistant-ui/react', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@assistant-ui/react')>()

  return {
    ...actual,
    useAuiState: ((selector: (state: unknown) => unknown) =>
      selector({
        message: { createdAt: aui.createdAt },
      })) as typeof actual.useAuiState,
  }
})

const NOW = new Date('2026-11-25T12:00:00.000Z').getTime()
const DATE = '[data-sl-ai-message-date]'

function renderDate(
  createdAt: unknown,
  props: { date?: Date | string | number } = {},
  locale = 'en-US'
) {
  aui.createdAt = createdAt

  return render(
    <LocaleProvider locale={locale}>
      <AIMessageDate {...props} />
    </LocaleProvider>
  )
}

function getDate() {
  return document.querySelector(DATE) as HTMLElement | null
}

describe('AIMessageDate', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    vi.setSystemTime(NOW)
  })

  afterEach(() => {
    aui.createdAt = undefined
    vi.useRealTimers()
  })

  it('reads createdAt from the message and renders a time element with ISO dateTime and a title', () => {
    const createdAt = new Date(NOW - 5 * 60_000)

    renderDate(createdAt)

    const time = getDate() as HTMLElement

    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', createdAt.toISOString())
    expect(time).toHaveAttribute(
      'title',
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'short',
        timeStyle: 'medium',
      }).format(createdAt)
    )
  })

  it('under a minute: "now" with data-just-now', () => {
    renderDate(new Date(NOW - 30_000))

    expect(getDate()).toHaveTextContent('now')
    expect(getDate()).toHaveAttribute('data-just-now')
  })

  it('older: relative text without data-just-now', () => {
    renderDate(new Date(NOW - 5 * 60_000))

    expect(getDate()).toHaveTextContent('5m ago')
    expect(getDate()).not.toHaveAttribute('data-just-now')
  })

  it('date prop overrides the message date', () => {
    renderDate(new Date(NOW - 30_000), {
      date: new Date(NOW - 10 * 60_000).toISOString(),
    })

    expect(getDate()).toHaveTextContent('10m ago')
  })

  it('accepts a date in epoch milliseconds', () => {
    renderDate(undefined, { date: NOW - 5 * 60_000 })

    expect(getDate()).toHaveTextContent('5m ago')
  })

  it('missing or invalid createdAt renders nothing (Review Focus 1)', () => {
    const { unmount } = renderDate(undefined)

    expect(getDate()).toBeNull()
    unmount()

    renderDate(new Date('not a date'))
    expect(getDate()).toBeNull()
  })

  it('future createdAt renders the "now" form (Review Focus 2)', () => {
    renderDate(new Date(NOW + 10 * 60_000))

    expect(getDate()).toHaveTextContent('now')
    expect(getDate()).toHaveAttribute('data-just-now')
  })

  it('updates when the shared clock ticks', () => {
    renderDate(new Date(NOW - 1_000))

    expect(getDate()).toHaveTextContent('now')

    act(() => {
      vi.advanceTimersByTime(60_000)
    })

    expect(getDate()).toHaveTextContent('1m ago')
    expect(getDate()).not.toHaveAttribute('data-just-now')
  })

  it('pt-BR outside a provider: the Intl format of the locale', () => {
    renderDate(new Date(NOW - 5 * 60_000), {}, 'pt-BR')

    expect(getDate()?.textContent).toBe('há 5 min.')
  })

  it('pt-BR inside the provider: the catalog format', () => {
    aui.createdAt = new Date(NOW - 5 * 60_000)

    render(
      <LocaleProvider locale="pt-BR">
        <AIMessagesI18nProvider>
          <AIMessageDate />
        </AIMessagesI18nProvider>
      </LocaleProvider>
    )

    expect(getDate()?.textContent).toBe('há 5 min')
  })

  it('server render: only dateTime, no relative text, title or data-just-now', () => {
    const createdAt = new Date(NOW - 30_000)

    aui.createdAt = createdAt

    const html = renderToString(
      <LocaleProvider locale="en-US">
        <AIMessageDate />
      </LocaleProvider>
    )
    const host = document.createElement('div')

    host.innerHTML = html

    const time = host.querySelector(DATE) as HTMLElement

    expect(time.tagName).toBe('TIME')
    expect(time).toHaveAttribute('dateTime', createdAt.toISOString())
    expect(time.textContent).toBe('')
    expect(time).not.toHaveAttribute('title')
    expect(time).not.toHaveAttribute('data-just-now')
  })
})
