import React, { Fragment } from 'react'
import { render, axe } from '../../test-utils'

import { TextArea } from './index'

describe('TextArea tests', () => {
  it('should have overridable styles', () => {
    const { getByTestId } = render(
      <TextArea
        data-testid="text-area"
        csx={{ backgroundColor: 'azure' }}
        value=""
        onChange={() => {}}
        label="TextArea label"
        id="text-area-1"
        helperText="Helper"
        charLimit={120}
      />
    )

    expect(getByTestId('text-area')).toHaveStyleRule(
      'background-color',
      'azure'
    )
  })

  it('should match snapshot', () => {
    const { asFragment } = render(
      <Fragment>
        <TextArea
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-2"
        />
        <TextArea
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-3"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-4"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-5"
        />
      </Fragment>
    )

    expect(asFragment()).toMatchSnapshot()
  })

  it('should not have a11y violations', async () => {
    const { container } = render(
      <Fragment>
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          label="Label"
          id="text-area-1"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          errorMessage="Error Message"
          value=""
          onChange={() => {}}
          error
          label="Label"
          id="text-area-2"
        />
        <TextArea
          charLimit={120}
          helperText="Helper Text"
          value=""
          onChange={() => {}}
          error
          label="Label"
          disabled
          id="text-area-3"
        />
      </Fragment>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
