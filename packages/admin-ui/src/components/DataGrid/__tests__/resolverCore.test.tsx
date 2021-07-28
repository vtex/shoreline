import {
  accessHeader,
  accessCell,
  resolveHeader,
  createResolver,
  resolveCell,
} from '../resolvers/core'

describe('table resolver core tests', () => {
  describe('accessHeader', () => {
    it('should access string headers', () => {
      const result = accessHeader({
        id: 'test',
        header: 'Test',
      })

      expect(result).toBe('Test')
    })

    it('should access function headers', () => {
      const result = accessHeader({
        id: 'test',
        header: () => 'Test',
      })

      expect(result).toBe('Test')
    })
  })

  describe('accessCell', () => {
    it('should be able to access without an accessor', () => {
      const result = accessCell(
        {
          id: 'name',
        },
        { id: 1, name: 'Miles morales', city: 'NY', age: '23' }
      )

      expect(result).toBe('Miles morales')
    })

    it('should be able to access nested fields on object', () => {
      const result = accessCell(
        {
          id: 'location',
          header: 'City',
          accessor: 'location.city',
        },
        {
          id: 1,
          name: 'Miles morales',
          location: { city: 'NY' },
          age: '23',
        }
      )

      expect(result).toBe('NY')
    })

    it('should be able to access nested fields on array', () => {
      const result = accessCell(
        {
          id: 'phones',
          header: 'Main phone area',
          accessor: 'phones.0.area',
        },
        {
          id: 1,
          name: 'Miles morales',
          location: { city: 'NY' },
          age: '23',
          phones: [
            {
              area: '212',
              number: '222-1211',
            },
            '456',
          ],
        }
      )

      expect(result).toBe('212')
    })

    it('should be able to access with a function accessor', () => {
      const result = accessCell(
        {
          id: 'fullName',
          header: 'Full name',
          accessor: (item) => `${item.name} ${item.lastName}`,
        },
        {
          id: 1,
          name: 'Miles',
          lastName: 'Morales',
          location: { city: 'NY' },
          age: '23',
        }
      )

      expect(result).toBe('Miles Morales')
    })
  })

  describe('resolveHeader', () => {
    it('resolves a header without a resolver.header filed', () => {
      const plain = createResolver({
        cell: function cellResolver() {
          return '_blank_'
        },
      })

      const { content } = resolveHeader({
        column: {
          id: 'test',
          header: 'Correct',
          resolver: {
            type: 'plain',
          },
        },
        resolvers: {
          plain,
        },
        items: [],
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
      })

      expect(content).toBe('Correct')
    })

    it('chooses the resolver type correctly', () => {
      const plain = createResolver({
        header: function headerResolver({ getData }) {
          return getData()
        },
        cell: function cellResolver() {
          return '_blank_'
        },
      })

      const { content } = resolveHeader({
        column: {
          id: 'test',
          header: 'Correct',
          resolver: {
            type: 'plain',
          },
        },
        items: [],
        resolvers: {
          plain,
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
      })

      expect(content).toBe('Correct')
    })
  })

  describe('resolveCell', () => {
    it('should be able to resolve a field', () => {
      const plain = createResolver({
        cell: function cellResolver({ getData }) {
          return getData()
        },
      })

      const result = resolveCell({
        column: {
          id: 'location',
          header: 'City',
          accessor: 'location.city',
          resolver: {
            type: 'plain',
          },
        },
        resolvers: {
          plain,
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
        item: {
          id: 1,
          name: 'Miles morales',
          location: { city: 'NY' },
          age: '23',
        },
      })

      expect(result).toBe('NY')
    })
  })

  describe('resolver factory - header', () => {
    const resolver = createResolver({
      header: function headerResolver({ getData, context }) {
        if (context.density === 'variable') {
          return 'variable density'
        }

        if (context.status === 'loading') {
          return 'loading...'
        }

        return getData()
      },
      cell: function cellResolver() {
        return '_blank_'
      },
    })

    it('should be able to access data within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
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
        column: {
          id: 'image',
          accessor: 'image',
        },
        items: [],
      })

      expect(result).toBe('data')
    })

    it('should be able to handle loading within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
        context: {
          density: 'regular',
          status: 'loading',
          statusObject: {
            loading: true,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        column: {
          id: 'image',
          accessor: 'image',
        },
        items: [],
      })

      expect(result).toBe('loading...')
    })

    it('should be able to handle different densities within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
        context: {
          density: 'variable',
          status: 'ready',
          statusObject: {
            loading: false,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        column: {
          id: 'image',
          accessor: 'image',
        },
        items: [],
      })

      expect(result).toBe('variable density')
    })
  })

  describe('resolver factory - cell', () => {
    const resolver = createResolver({
      cell: function cellResolver({ getData, context, item, column }) {
        if (context.density === 'variable') {
          return 'variable density'
        }

        if (context.status === 'loading') {
          return 'loading...'
        }

        if (column.width && column.width > 1000) {
          throw new Error('Large widths are not allowed')
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((item as any).image) {
          return 'item-with-image'
        }

        return getData()
      },
    })

    it('should be able to access data within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
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
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          accessor: 'name',
        },
      })

      expect(result).toBe('data')
    })

    it('should be able to handle loading within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: {
          density: 'regular',
          status: 'loading',
          statusObject: {
            loading: true,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          accessor: 'name',
        },
      })

      expect(result).toBe('loading...')
    })

    it('should be able to handle different densities within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: {
          density: 'variable',
          status: 'ready',
          statusObject: {
            loading: false,
            error: null,
            empty: null,
            notFound: null,
          },
        },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          accessor: 'name',
        },
      })

      expect(result).toBe('variable density')
    })

    it('should be able to handle item values within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
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
        item: {
          image: 'image',
        },
        column: {
          id: 'image',
          accessor: 'image',
        },
      })

      expect(result).toBe('item-with-image')
    })

    it('should be able to handle column values within a cell function', () => {
      expect(() =>
        resolver.cell({
          getData: () => 'data',
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
          item: {
            name: 'name',
          },
          column: {
            id: 'name',
            accessor: 'name',
            width: 1001,
          },
        })
      ).toThrowError()
    })
  })
})
