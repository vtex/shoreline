import React from 'react'
import { Search } from '../search'
import {
  describe,
  expect,
  it,
  vi,
  render,
  fireEvent,
} from '@vtex/shoreline-test-utils'

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
    const { container } = render(<Search value="test" onClear={onClear} />)

    const clearButton = container.querySelector('[data-sl-icon-button]')

    expect(clearButton).toBeInTheDocument()
    fireEvent.click(clearButton!)
    expect(onClear).toHaveBeenCalled()
  })

  it('should not show clear button when value is present and onClear prop is provided but element is disabled', () => {
    const onClear = vi.fn()
    const { container } = render(
      <Search value="test" onClear={onClear} disabled />
    )

    const clearButton = container.querySelector('[data-sl-icon-button]')

    expect(clearButton).not.toBeInTheDocument()
  })

  it('focus on input when parent div is clicked', () => {
    const { container } = render(<Search />)
    const input = container.querySelector('input')

    expect(input).not.toHaveFocus()
    fireEvent.click(container.querySelector('[data-sl-search]')!)
    expect(input).toHaveFocus()
  })

  it('focus on input when parent div is clicked while receiving a ref', () => {
    const ref = React.createRef<HTMLInputElement>()
    const { container } = render(<Search ref={ref} />)
    const input = container.querySelector('input')

    expect(input).not.toHaveFocus()
    fireEvent.click(container.querySelector('[data-sl-search]')!)
    expect(input).toHaveFocus()
  })
})
