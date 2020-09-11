import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer from 'jest-emotion'

import { ThemeProvider } from '../../theme'
import { Skeleton, Shape } from './index'

expect.addSnapshotSerializer(serializer)

describe('Button tests', () => {
  it('should match snapshot', () => {
    const shapes = ['circle', 'rect'] as Shape[]

    const { asFragment } = render(
      <ThemeProvider>
        {shapes.map((shape, i) => (
          <Skeleton key={i} shape={shape} />
        ))}
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
