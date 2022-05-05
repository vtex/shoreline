import { renderHook } from '../../test-utils'
import { useFormatter } from '../use-formatter'

describe('use-formatter', () => {
  it('date', () => {
    const { result } = renderHook(() =>
      useFormatter({
        mask: '__/__/____',
        accept: /[\d]/gi,
      })
    )

    const formatter = result.current

    expect(formatter('21')).toEqual('21/')
    expect(formatter('21/1')).toEqual('21/1')
    expect(formatter('211/')).toEqual('21/1')
    expect(formatter('21/12')).toEqual('21/12/')
    expect(formatter('21/12/21')).toEqual('21/12/21')
    expect(formatter('21/12/2010')).toEqual('21/12/2010')
    expect(formatter('21-12-2010')).toEqual('21/12/2010')
    expect(formatter('2f')).toEqual('2')
  })

  it('cpf', () => {
    const { result } = renderHook(() =>
      useFormatter({
        mask: '___.___.___-__',
        accept: /[\d]/gi,
      })
    )

    const formatter = result.current

    expect(formatter('00')).toEqual('00')
    expect(formatter('000')).toEqual('000.')
    expect(formatter('000.000')).toEqual('000.000.')
    expect(formatter('000.000.000')).toEqual('000.000.000-')
    expect(formatter('000.000.000')).toEqual('000.000.000-')
    expect(formatter('000.000.00f')).toEqual('000.000.00')
  })
})
