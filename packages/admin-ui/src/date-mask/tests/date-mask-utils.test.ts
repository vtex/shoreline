import { maskedDateFormatter } from '../date-mask-utils'

describe('date-mask-utils', () => {
  it('maskedDateFormatter for date', () => {
    const formatterFn = maskedDateFormatter('__/__/____', /[\d]/gi)

    expect(formatterFn('21')).toEqual('21/')
    expect(formatterFn('21/1')).toEqual('21/1')
    expect(formatterFn('211/')).toEqual('21/1')
    expect(formatterFn('21/12')).toEqual('21/12/')
    expect(formatterFn('21/12/21')).toEqual('21/12/21')
    expect(formatterFn('21/12/2010')).toEqual('21/12/2010')
    expect(formatterFn('21-12-2010')).toEqual('21/12/2010')
    expect(formatterFn('2f')).toEqual('2')
  })
})
