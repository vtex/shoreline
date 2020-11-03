import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import serializer, { matchers } from 'jest-emotion'

import { Avatar } from './index'
import { ThemeProvider } from '../../system'

expect.addSnapshotSerializer(serializer)
expect.extend(matchers)

describe('Avatar tests', () => {
  it('should render the first letter', () => {
    const { getByText } = render(
      <ThemeProvider>
        <Avatar label="Test" />
      </ThemeProvider>
    )

    expect(getByText('T')).toBeTruthy()
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Avatar
          data-testid="avatar"
          label="Test"
          styleOverrides={{ bg: 'azure' }}
        />
      </ThemeProvider>
    )

    expect(getByTestId('avatar')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snaphot with label', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Avatar label="Test" />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snaphot with pallette', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Avatar label="Test" palette="base" />
        <Avatar label="Test" palette="danger" />
        <Avatar label="Test" palette="primary" />
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
