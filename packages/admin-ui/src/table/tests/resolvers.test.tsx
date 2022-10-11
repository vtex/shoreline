/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@testing-library/react'

import { resolvers } from '../resolvers/base'
import { plainResolver } from '../resolvers/plain'

describe('Resolvers tests', () => {
  describe('root', () => {
    it('should render a ReactNode', () => {
      const { root } = resolvers

      const result = root.cell({
        item: { id: '1', name: 'name' },
        column: {
          id: 'name',
          resolver: {
            type: 'root',
            render: function Render({ item }) {
              return <button>{(item as any).name}</button>
            },
          },
        },
        context: 'ready',
        getData: () => 'root',
      })

      const { getByRole } = render(<>{result}</>)

      expect(getByRole('button')).toBeInTheDocument()
    })
  })

  describe('plain', () => {
    it('should return the correct data', () => {
      const { plain } = resolvers

      const result = plain.cell({
        item: { id: '1', name: 'name' },
        column: {
          id: 'name',
          resolver: {
            type: 'plain',
          },
        },
        context: 'ready',
        getData: () => 'data',
      })

      const { getByText } = render(<>{result}</>)

      expect(getByText('data')).toBeInTheDocument()
    })

    it('should render a ReactNode', () => {
      const { plain } = resolvers

      const result = plain.cell({
        item: { id: '1', name: 'name' },
        column: {
          id: 'name',
          resolver: {
            type: 'plain',
            render: function Render({ data }) {
              return <button>{data}</button>
            },
          },
        },
        context: 'ready',
        getData: () => 'data',
      })

      const { getByRole, getByText } = render(<>{result}</>)

      expect(getByRole('button')).toBeInTheDocument()
      expect(getByText('data')).toBeInTheDocument()
    })
  })
})
