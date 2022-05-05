import React, { useState } from 'react'

import { render, userEvent } from '../../test-utils'
import { useMaskedInput } from '../use-masked-input'
import { useFormatter } from '../use-formatter'

function MaskedInput() {
  const [value, onChange] = useState('')

  const formatter = useFormatter({
    mask: '__/__/____',
    accept: /[\d]/gi,
  })

  const inputProps = useMaskedInput({
    value,
    onChange,
    formatter,
  })

  return <input data-testid="masked-input" {...inputProps} />
}

const setup = () => {
  const utils = render(<MaskedInput />)
  const input = utils.getByTestId('masked-input') as HTMLInputElement

  return {
    input,
    ...utils,
  }
}

describe('use-masked-input', () => {
  it('should keep the same value', () => {
    const { input } = setup()

    userEvent.type(input, '2')
    expect(input.value).toBe('2')
  })

  it('should add the first part of the mask', () => {
    const { input } = setup()

    userEvent.type(input, '22')
    expect(input.value).toBe('22/')
  })

  it('should accept nothing but digits', () => {
    const { input } = setup()

    userEvent.type(input, '223')
    expect(input.value).toBe('22/3')

    userEvent.type(input, '/')
    expect(input.value).toBe('22/3')

    userEvent.type(input, 'aaa')
    expect(input.value).toBe('22/3')
  })

  it('should complete the mask', () => {
    const { input } = setup()

    userEvent.type(input,'22032020')
    expect(input.value).toBe('22/03/2020')
  })
})
