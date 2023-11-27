import React from 'react'
import { Search } from '../search'
import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render } from '@testing-library/react'

describe('search', () => {
  it('should render correctly', () => {
    const { getByPlaceholderText, container } = render(<Search />)

    expect(getByPlaceholderText('Search')).toBeInTheDocument()
    expect(container.querySelector('[data-sl-search]')).toBeInTheDocument()
  })

  it('should be disabled when disabled prop is true', () => {
    const { getByPlaceholderText } = render(<Search disabled />)
    const input = getByPlaceholderText('Search') as HTMLInputElement

    expect(input.disabled).toBe(true)
  })

  it('should show loading spinner when loading prop is true', () => {
    const { container } = render(<Search loading />)

    expect(container.querySelector('[data-sl-spinner]')).toBeInTheDocument()
  })

  it('should show have custom placeholder when placeholder prop is set', () => {
    const { getByPlaceholderText } = render(<Search placeholder="Buscar" />)

    expect(getByPlaceholderText('Buscar')).toBeInTheDocument()
  })

  it('should show clear button when value is present and onClear prop is provided', () => {
    const onClear = vi.fn()
    const { container } = render(
      <Search defaultValue="test" onClear={onClear} />
    )

    const clearButton = container.querySelector('[data-sl-icon-button]')

    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton!)
    expect(onClear).toHaveBeenCalled()
  })
})
