import { buildInstance } from '../../builders'
import { createRuntime } from '../../runtime'

describe('instance builder', () => {
  const runtime = createRuntime({
    name: 'onda-runtime-tst',
    instance: (params: InstanceParams) => {
      return params
    },
    parser: () => (csx: Csx = {}) =>
      ({ backgroundColor: csx?.bg ?? '', color: csx?.c ?? '' } as Style),
    compiler: () => (style: Style) =>
      `${style?.backgroundColor}${style?.color}`,
  })

  it('should be able to build instances', () => {
    const result = buildInstance(
      {
        name: 'test-instance',
      },
      runtime
    )

    expect(result).toEqual({
      name: 'test-instance',
    })
  })
})

interface Csx {
  bg?: string
  c?: string
}

interface Style {
  backgroundColor: string
  color: string
}

interface InstanceParams {
  name: string
}
