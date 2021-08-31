import React from 'react'
import { render, axe } from '../../test-utils'

import { Text } from './index'

describe('Text tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Text data-testid="text" csx={{ color: 'azure' }}>
        Text test
      </Text>
    )

    expect(getByTestId('text')).toHaveStyleRule('color', 'azure')
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <>
        <Text>Span</Text>
        <Text as="strong">Bold</Text>
        <Text as="i">Italic</Text>
        <Text as="u">Underline</Text>
        <Text as="abbr">I18N</Text>
        <Text as="cite">Citation</Text>
        <Text as="del">Deleted</Text>
        <Text as="em">Emphasis</Text>
        <Text as="ins">Inserted</Text>
        <Text as="kbd">Ctrl + C</Text>
        <Text as="mark">Highlighted</Text>
        <Text as="s">Strikethrough</Text>
        <Text as="samp">Sample</Text>
        <Text as="sub">sub</Text>
        <Text as="sup">sup</Text>
      </>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <>
        <Text>Span</Text>
        <Text as="strong">Bold</Text>
        <Text as="i">Italic</Text>
        <Text as="u">Underline</Text>
        <Text as="abbr">I18N</Text>
        <Text as="cite">Citation</Text>
        <Text as="del">Deleted</Text>
        <Text as="em">Emphasis</Text>
        <Text as="ins">Inserted</Text>
        <Text as="kbd">Ctrl + C</Text>
        <Text as="mark">Highlighted</Text>
        <Text as="s">Strikethrough</Text>
        <Text as="samp">Sample</Text>
        <Text as="sub">sub</Text>
        <Text as="sup">sup</Text>
      </>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
