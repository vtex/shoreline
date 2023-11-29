import React from 'react'
import {
  describe,
  expect,
  it,
  render,
  renderHook,
} from '@vtex/shoreline-test-utils'

import { LocaleProvider } from '../locale-provider'
import { createMessageHook } from '../create-message-hook'

describe('create-message-hook', () => {
  it('gets the message of the default Locale', () => {
    const messages = {
      'en-US': {
        word: 'Word',
      },
      'pt-BR': {
        word: 'Palavra',
      },
    }

    const useMessage = createMessageHook(messages)

    const hook = renderHook(() => useMessage())

    const { getByText } = render(
      <LocaleProvider>
        <div>{hook.result.current('word')}</div>
      </LocaleProvider>
    )

    expect(getByText('Word')).toBeInTheDocument()
  })

  it('replaces default messages', () => {
    const messages = {
      'en-US': {
        word: 'Word',
      },
      'pt-BR': {
        word: 'Palavra',
      },
    }

    const useMessage = createMessageHook(messages)

    const hook = renderHook(() =>
      useMessage({
        word: 'Custom',
      })
    )

    const { getByText } = render(
      <LocaleProvider>
        <div>{hook.result.current('word')}</div>
      </LocaleProvider>
    )

    expect(getByText('Custom')).toBeInTheDocument()
  })

  it('gets message relative to the Locale context', () => {
    const messages = {
      'en-US': {
        word: 'Word',
      },
      'pt-BR': {
        word: 'Palavra',
      },
    }

    const useMessage = createMessageHook(messages)

    const hook = renderHook(() => useMessage(), {
      wrapper: ({ children }) => (
        <LocaleProvider locale="pt-BR">{children}</LocaleProvider>
      ),
    })

    const { getByText } = render(
      <LocaleProvider locale="pt-BR">
        <div>{hook.result.current('word')}</div>
      </LocaleProvider>
    )

    expect(getByText('Palavra')).toBeInTheDocument()
  })

  it('gets dynamic message', () => {
    const messages = {
      'en-US': {
        pageLabel: '{page} of {pages}',
      },
    }

    const useMessage = createMessageHook(messages)

    const hook = renderHook(() => useMessage(), {
      wrapper: ({ children }) => (
        <LocaleProvider locale="en-US">{children}</LocaleProvider>
      ),
    })

    const { getByText } = render(
      <LocaleProvider locale="en-US">
        <div>{hook.result.current('pageLabel', { page: 4, pages: 765 })}</div>
      </LocaleProvider>
    )

    expect(getByText('4 of 765')).toBeInTheDocument()
  })

  it('fallbacks message value when dynamic message is not specified correctly', () => {
    const messages = {
      'en-US': {
        pageLabel: '{page} of {pages}',
      },
    }

    const useMessage = createMessageHook(messages)

    const hook = renderHook(() => useMessage(), {
      wrapper: ({ children }) => (
        <LocaleProvider locale="en-US">{children}</LocaleProvider>
      ),
    })

    const { getByText } = render(
      <LocaleProvider locale="en-US">
        <div>{hook.result.current('pageLabel', { page: 4 })}</div>
      </LocaleProvider>
    )

    expect(getByText('4 of {pages}')).toBeInTheDocument()
  })
})
