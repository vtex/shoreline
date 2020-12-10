import {
  accessHeader,
  accessCell,
  resolveHeader,
  createResolver,
  resolveCell,
} from '../resolvers/core'

describe('talbe resolver core tests', () => {
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
    it('should be able to access without an acessor', () => {
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
          acessor: 'location.city',
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
          acessor: 'phones.0.area',
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
          acessor: (item) => `${item.name} ${item.lastName}`,
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

      const result = resolveHeader({
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
        context: {
          dir: 'ltr',
          density: 'regular',
          loading: false,
        },
      })

      expect(result).toBe('Correct')
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

      const result = resolveHeader({
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
        context: {
          dir: 'ltr',
          density: 'regular',
          loading: false,
        },
      })

      expect(result).toBe('Correct')
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
          acessor: 'location.city',
          resolver: {
            type: 'plain',
          },
        },
        resolvers: {
          plain,
        },
        context: {
          dir: 'ltr',
          density: 'regular',
          loading: false,
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

        if (context.dir === 'rtl') {
          return 'rtl layout'
        }

        if (context.loading) {
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
        context: { dir: 'ltr', density: 'regular', loading: false },
      })

      expect(result).toBe('data')
    })

    it('should be able to handle loading within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
        context: { dir: 'ltr', density: 'regular', loading: true },
      })

      expect(result).toBe('loading...')
    })

    it('should be able to handle different densities within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
        context: { dir: 'ltr', density: 'variable', loading: false },
      })

      expect(result).toBe('variable density')
    })

    it('should be able to handle rtl layouts within a header function', () => {
      const result = resolver?.header?.({
        getData: () => 'data',
        context: { dir: 'rtl', density: 'regular', loading: false },
      })

      expect(result).toBe('rtl layout')
    })
  })

  describe('resolver factory - cell', () => {
    const resolver = createResolver({
      cell: function cellResolver({ getData, context, item, column }) {
        if (context.density === 'variable') {
          return 'variable density'
        }

        if (context.dir === 'rtl') {
          return 'rtl layout'
        }

        if (context.loading) {
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
        context: { dir: 'ltr', density: 'regular', loading: false },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          acessor: 'name',
        },
      })

      expect(result).toBe('data')
    })

    it('should be able to handle loading within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: { dir: 'ltr', density: 'regular', loading: true },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          acessor: 'name',
        },
      })

      expect(result).toBe('loading...')
    })

    it('should be able to handle different densities within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: { dir: 'ltr', density: 'variable', loading: false },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          acessor: 'name',
        },
      })

      expect(result).toBe('variable density')
    })

    it('should be able to handle rtl layouts within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: { dir: 'rtl', density: 'regular', loading: false },
        item: {
          name: 'Name',
        },
        column: {
          id: 'name',
          acessor: 'name',
        },
      })

      expect(result).toBe('rtl layout')
    })

    it('should be able to handle item values within a cell function', () => {
      const result = resolver.cell({
        getData: () => 'data',
        context: { dir: 'ltr', density: 'regular', loading: false },
        item: {
          image: 'image',
        },
        column: {
          id: 'image',
          acessor: 'image',
        },
      })

      expect(result).toBe('item-with-image')
    })

    it('should be able to handle column values within a cell function', () => {
      expect(() =>
        resolver.cell({
          getData: () => 'data',
          context: { dir: 'ltr', density: 'regular', loading: false },
          item: {
            name: 'name',
          },
          column: {
            id: 'name',
            acessor: 'name',
            width: 1001,
          },
        })
      ).toThrowError()
    })
  })
})
