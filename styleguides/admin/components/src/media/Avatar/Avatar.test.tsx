import React, { Fragment } from 'react'

import { Avatar } from './index'
import { render } from '../../test-utils'

describe('Avatar tests', () => {
  it('should render the first letter', () => {
    const { getByText } = render(<Avatar label="Test" />)

    expect(getByText('T')).toBeTruthy()
  })

  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <Avatar data-testid="avatar" label="Test" csx={{ bg: 'azure' }} />
    )

    expect(getByTestId('avatar')).toHaveStyleRule('background-color', 'azure')
  })

  it('should match snaphot with label', () => {
    const { asFragment } = render(<Avatar label="Test" />)

    expect(asFragment()).toMatchSnapshot()
  })

  it('should match snaphot with pallette', () => {
    const { asFragment } = render(
      <Fragment>
        <Avatar label="Test" palette="base" />
        <Avatar label="Test" palette="danger" />
        <Avatar label="Test" palette="primary" />
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
