import { createThemeConsumers } from '../createSystem'

describe('stylesOf test', () => {
  const theme = {
    space: ['0px', '2px', '4px'],
    sizes: {
      half: '50%',
      full: '100%',
    },
    components: {
      alert: {
        bg: 'red',
        color: 'white',
        padding: 2,
        width: 'full',
      },
    },
  }

  it('should be able to consume a themeKey', () => {
    const { stylesOf } = createThemeConsumers(theme)
    const styles = stylesOf('components.alert')

    expect(styles).toEqual(theme.components.alert)
  })

  it('should be able to consume a scale', () => {
    const { stylesOf } = createThemeConsumers(theme)
    const styles = stylesOf('sizes')

    expect(styles).toEqual(theme.sizes)
  })

  it('should be able to consume a scale value', () => {
    const { stylesOf } = createThemeConsumers(theme)
    const styles = stylesOf('sizes.half')

    expect(styles).toEqual(theme.sizes.half)
  })
})
