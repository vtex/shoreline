/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render } from '@testing-library/react'

import { rootResolver } from '../resolvers/root'
import { plainResolver } from '../resolvers/plain'

describe('Resolvers tests', () => {
  describe('root', () => {
    it('should render a ReactNode', () => {
      const resolver = rootResolver()

      const result = resolver.cell({
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
        context: {
          density: 'regular',
          status: 'ready',
          statusObject: {
            loading: false,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        getData: () => 'root',
      })

      const { getByRole } = render(<>{result}</>)

      expect(getByRole('button')).toBeInTheDocument()
    })
  })

  describe('plain', () => {
    it('should return the correct data', () => {
      const resolver = plainResolver()

      const result = resolver.cell({
        item: { id: '1', name: 'name' },
        column: {
          id: 'name',
          resolver: {
            type: 'plain',
          },
        },
        context: {
          density: 'regular',
          status: 'ready',
          statusObject: {
            loading: false,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        getData: () => 'data',
      })

      const { getByText } = render(<>{result}</>)

      expect(getByText('data')).toBeInTheDocument()
    })

    it('should render a ReactNode', () => {
      const resolver = plainResolver()

      const result = resolver.cell({
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
        context: {
          density: 'regular',
          status: 'ready',
          statusObject: {
            loading: false,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        getData: () => 'data',
      })

      const { getByRole, getByText } = render(<>{result}</>)

      expect(getByRole('button')).toBeInTheDocument()
      expect(getByText('data')).toBeInTheDocument()
    })
  })
})
