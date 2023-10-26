import React from 'react'
import { Search } from '../search'
import { describe, expect, test, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

describe('search', () => {
  test('should render correctly', () => {
    const { getByPlaceholderText, container } = render(<Search />)

    expect(getByPlaceholderText('Search')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-search]')).toBeInTheDocument()
  })

  test('should be disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(<Search disabled />)
    const input = getByPlaceholderText('Search') as HTMLInputElement

    expect(input.disabled).toBe(true)
  })

  test('should show loading spinner when loading prop is true', () => {
    const { container } = render(<Search loading />)

    expect(container.querySelector('[data-sl-spinner]')).toBeInTheDocument()
  })

  test('should show have custom placeholder when placeholder prop is set', () => {
    const { getByPlaceholderText } = render(<Search placeholder="Buscar" />)

    expect(getByPlaceholderText('Buscar')).toBeInTheDocument()
  })

  test('should show clear button when value is present and onClear prop is provided', () => {
    const onClear = vi.fn()
    const { container } = render(<Search value="test" onClear={onClear} />)
    const clearButton = container.querySelector('[data-sl-icon-button]')

    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton!)
    expect(onClear).toHaveBeenCalled()
  })
})
