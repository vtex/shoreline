import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../system'
import { Button, Palette, Size, Variant } from './index'

expect.addSnapshotSerializer(serializer)

describe('Button tests', () => {
  it('should match snapshot', () => {
    const variants = ['filled', 'subtle', 'text'] as Variant[]
    const palettes = ['primary', 'danger'] as Palette[]
    const sizes = ['regular', 'small'] as Size[]

    const { asFragment } = render(
      <ThemeProvider>
        <Button>Default</Button>
        {variants.map((variant) =>
          palettes.map((palette) =>
            sizes.map((size, i) => (
              <Button key={i} variant={variant} palette={palette} size={size}>
                {variant} - {palette} - {size}
              </Button>
            ))
          )
        )}
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
