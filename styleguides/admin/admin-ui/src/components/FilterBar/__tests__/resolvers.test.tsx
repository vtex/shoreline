/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@testing-library/react'

import { rootResolver } from '../resolvers/root'
import { simpleResolver } from '../resolvers/simple'
import { ThemeProvider } from '@vtex/admin-core'

describe('Resolvers tests', () => {
  describe('root', () => {
    it('should render a ReactNode', () => {
      const resolver = rootResolver()

      const result = resolver.value({
        statement: {
          condition: { label: 'is', id: '1' },
          filter: {
            label: 'Filter',
            id: 'filter',
            conditions: [{ label: 'is', id: '1' }],
            resolver: {
              type: 'root',
              defaultValue: { value: 'root' },
              render: ({ statement: { target } }) => {
                return <button>{(target as any).value}</button>
              },
            },
          },
          target: { value: 'root' },
        },
        index: 0,
        handleValueChange: (value, index) => `${value} + ${index}`,
      })

      const { getByRole } = render(<>{result}</>)

      expect(getByRole('button')).toBeInTheDocument()
    })

    it('should render the correct data', () => {
      const resolver = rootResolver()

      const result = resolver.value({
        statement: {
          condition: { label: 'is', id: '1' },
          filter: {
            label: 'Filter',
            id: 'filter',
            conditions: [{ label: 'is', id: '1' }],
            resolver: {
              type: 'root',
              defaultValue: { value: 'root' },
              render: ({ statement: { target } }) => {
                return <button>{(target as any).value}</button>
              },
            },
          },
          target: { value: 'root' },
        },
        index: 0,
        handleValueChange: (value, index) => `${value} + ${index}`,
      })

      const { getByText } = render(<>{result}</>)

      expect(getByText('root')).toBeInTheDocument()
    })
  })

  describe('simple', () => {
    beforeAll(() => {
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // Deprecated
          removeListener: jest.fn(), // Deprecated
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      })
    })

    it('should render a Dropdown', () => {
      const resolver = simpleResolver()

      const result = resolver.value({
        statement: {
          condition: { label: 'is', id: '1' },
          filter: {
            label: 'Filter',
            id: 'filter',
            conditions: [{ label: 'is', id: '1' }],
            resolver: {
              type: 'simple',
              defaultValue: { value: 'item 1' },
              items: [
                { value: 'item 1' },
                { value: 'item 2' },
                { value: 'item 3' },
              ],
            },
          },
          target: { value: 'item 1' },
        },
        index: 0,
        handleValueChange: (value, index) => `${value} + ${index}`,
      })
      const { getByRole } = render(<ThemeProvider>{result}</ThemeProvider>)

      expect(getByRole('button')).toBeInTheDocument()
    })

    it('should render the correct data', () => {
      const resolver = simpleResolver()

      const result = resolver.value({
        statement: {
          condition: { label: 'is', id: '1' },
          filter: {
            label: 'Filter',
            id: 'filter',
            conditions: [{ label: 'is', id: '1' }],
            resolver: {
              type: 'simple',
              defaultValue: { value: 'item 1' },
              items: [
                { value: 'item 1' },
                { value: 'item 2' },
                { value: 'item 3' },
              ],
            },
          },
          target: { value: 'item 1' },
        },
        index: 0,
        handleValueChange: (value, index) => `${value} + ${index}`,
      })
      const { getByText } = render(<ThemeProvider>{result}</ThemeProvider>)

      expect(getByText('item 1')).toBeInTheDocument()
    })

    it('should access the correct item label', () => {
      const resolver = simpleResolver()

      const result = resolver.value({
        statement: {
          condition: { label: 'is', id: '1' },
          filter: {
            label: 'Filter',
            id: 'filter',
            conditions: [{ label: 'is', id: '1' }],
            resolver: {
              type: 'simple',
              defaultValue: { value: { label: 'item 3' } },
              accessor: 'label',
              items: [
                { value: { label: 'item 1' } },
                { value: { label: 'item 2' } },
                { value: { label: 'item 3' } },
              ],
            },
          },
          target: { value: { label: 'item 3' } },
        },
        index: 0,
        handleValueChange: (value, index) => `${value} + ${index}`,
      })
      const { getByText } = render(<ThemeProvider>{result}</ThemeProvider>)

      expect(getByText('item 3')).toBeInTheDocument()
    })
  })
})
