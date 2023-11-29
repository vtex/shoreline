import React from 'react'
import {
  describe,
  it,
  expect,
  render,
  screen,
} from '@vtex/shoreline-test-utils'

import { Compose } from '../compose'

describe('compose', () => {
  it('renders', () => {
    const { getByText } = render(
      <Compose>
        <div>Compound</div>
      </Compose>
    )

    expect(getByText('Compound')).toBeVisible()
  })

  it('should merge props', async () => {
    render(
      <Compose data-testid="test" className="a" dir="rtl">
        <button className="b">test</button>
      </Compose>
    )

    const element = await screen.findByTestId('test')

    expect(element).toBeInTheDocument()
    expect(element.className).toBe('a b')
    expect(element.dir).toBe('rtl')
  })
})
