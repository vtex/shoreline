import React, { Fragment } from 'react'
import { render } from '../../test-utils'

import { Avatar } from './index'

describe('Avatar tests', () => {
  it('should render the first letter', () => {
    const { getByText } = render(<Avatar label="Test" />)

    expect(getByText('T')).toBeTruthy()
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Fragment>
        <Avatar data-testid="avatar" label="Test" csx={{ bg: 'azure' }} />
      </Fragment>
    )

    expect(getByTestId('avatar')).toHaveStyleRule('background', 'azure')
  })

  it('should match snaphot', () => {
    const { asFragment } = render(<Avatar label="Test" />)

    expect(asFragment()).toMatchSnapshot()
  })
})
