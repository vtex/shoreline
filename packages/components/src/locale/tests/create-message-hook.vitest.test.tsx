import React from 'react'
import { describe, expect, test } from 'vitest'
import { render, renderHook } from '@testing-library/react'

import { LocaleProvider } from '../locale-provider'
import { createMessageHook } from '../create-message-hook'

describe('create-message-hook', () => {
  test('gets the message of the default Locale', () => {
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

  test('gets message relative to the Locale context', () => {
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
})
