import React from 'react'

import { Paragraph } from './index'
import { render } from '../../test-utils'

describe('Paragraph tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Paragraph data-testid="paragraph" csx={{ bg: 'azure' }}>
        test paragraph
      </Paragraph>
    )

    expect(getByTestId('paragraph')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(<Paragraph>test paragraph</Paragraph>)

    expect(asFragment()).toMatchSnapshot()
  })
})
