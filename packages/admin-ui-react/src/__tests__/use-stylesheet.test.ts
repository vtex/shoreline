import { collectSyncStyles, extractVariantStyles } from '../system-deprecated'

describe('useStylesheet', () => {
  it('should collect the synced styles', () => {
    const run = (htmlProps: Record<string, any>) =>
      collectSyncStyles(
        [
          {
            size: 'small',
            icon: 'start',
            csx: {
              paddingLeft: 10,
            },
          },
          {
            size: 'small',
            icon: 'end',
            csx: {
              paddingRight: 10,
            },
          },
        ] as any,
        htmlProps
      )

    const result = {
      empty: run({}),
      small: run({
        size: 'small',
      }),
      smallStart: run({
        size: 'small',
        icon: 'start',
      }),
      smallEnd: run({
        size: 'small',
        icon: 'end',
      }),
    }

    expect(result.empty).toEqual([])
    expect(result.small).toEqual([])
    expect(result.smallStart).toEqual([
      {
        paddingLeft: 10,
      },
    ])
    expect(result.smallEnd).toEqual([
      {
        paddingRight: 10,
      },
    ])
  })

  it('should extract variant styles without sync', () => {
    const styles = {
      size: {
        small: {
          width: 200,
          height: 200,
        },
        regular: {
          width: 400,
          height: 400,
        },
      },
      theme: {
        primary: {
          color: 'white',
          bg: 'black',
        },
        secondary: {
          color: 'black',
          bg: 'gray',
        },
      },
    }

    const run = (htmlProps: Record<string, any>) =>
      extractVariantStyles(styles, [], htmlProps)

    const result = {
      small: run({
        size: 'small',
      })[1],
      smallPrimary: run({
        size: 'small',
        theme: 'primary',
      })[1],
      regularSecondary: run({
        size: 'regular',
        theme: 'secondary',
      })[1],
    }

    expect(result.small).toEqual(styles.size.small)
    expect(result.smallPrimary).toEqual({
      ...styles.size.small,
      ...styles.theme.primary,
    })
    expect(result.regularSecondary).toEqual({
      ...styles.size.regular,
      ...styles.theme.secondary,
    })
  })

  it('should extract variant styles with sync', () => {
    const run = (htmlProps: Record<string, any>) =>
      extractVariantStyles(
        {
          size: {
            small: {
              width: 200,
              height: 200,
            },
            regular: {
              width: 400,
              height: 400,
            },
          },
          theme: {
            primary: {
              color: 'white',
              bg: 'black',
            },
            secondary: {
              color: 'black',
              bg: 'gray',
            },
          },
        },
        [
          {
            size: 'small',
            theme: 'secondary',
            csx: {
              padding: 100,
            },
          } as any,
        ],
        htmlProps
      )

    const result = run({
      size: 'small',
      theme: 'secondary',
    })[1]

    expect(result).toEqual({
      width: 200,
      height: 200,
      color: 'black',
      bg: 'gray',
      padding: 100,
    })
  })
})
