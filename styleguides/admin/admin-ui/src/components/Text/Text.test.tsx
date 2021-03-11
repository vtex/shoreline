import React from 'react'
import { render } from '@testing-library/react'
import { axe } from 'jest-axe'

import { Text } from './index'
import { ThemeProvider } from '@vtex/admin-core'

describe('Text tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <ThemeProvider>
        <Text data-testid="text" csx={{ color: 'azure' }}>
          Text test
        </Text>
      </ThemeProvider>
    )

    expect(getByTestId('text')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <ThemeProvider>
        <Text>Span</Text>
        <Text element="strong">Bold</Text>
        <Text element="i">Italic</Text>
        <Text element="u">Underline</Text>
        <Text element="abbr">I18N</Text>
        <Text element="cite">Citation</Text>
        <Text element="del">Deleted</Text>
        <Text element="em">Emphasis</Text>
        <Text element="ins">Inserted</Text>
        <Text element="kbd">Ctrl + C</Text>
        <Text element="mark">Highlighted</Text>
        <Text element="s">Strikethrough</Text>
        <Text element="samp">Sample</Text>
        <Text element="sub">sub</Text>
        <Text element="sup">sup</Text>
      </ThemeProvider>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <Text>Span</Text>
        <Text element="strong">Bold</Text>
        <Text element="i">Italic</Text>
        <Text element="u">Underline</Text>
        <Text element="abbr">I18N</Text>
        <Text element="cite">Citation</Text>
        <Text element="del">Deleted</Text>
        <Text element="em">Emphasis</Text>
        <Text element="ins">Inserted</Text>
        <Text element="kbd">Ctrl + C</Text>
        <Text element="mark">Highlighted</Text>
        <Text element="s">Strikethrough</Text>
        <Text element="samp">Sample</Text>
        <Text element="sub">sub</Text>
        <Text element="sup">sup</Text>
      </ThemeProvider>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
