import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../theme'
import { Text, TextVariant } from './index'

expect.addSnapshotSerializer(serializer)

describe('Text tests', () => {
  it('should match snapshot', () => {
    const variants = [
      'small',
      'body',
      'highlight',
      'action',
      'subtitle',
      'headline',
    ] as TextVariant[]

    const { asFragment } = render(
      <ThemeProvider>
        {variants.map((variant, i) => (
          <Text key={i} variant={variant}>
            {variant}
          </Text>
        ))}
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
