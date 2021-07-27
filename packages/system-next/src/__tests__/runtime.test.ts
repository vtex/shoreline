import {
  createRuntime,
  getCompiler,
  getInstance,
  getRuntimeName,
  getParser,
  isValidRuntime,
} from '../runtime'

describe('runtime tests', () => {
  interface Csx {
    bg?: string
    c?: string
  }

  interface Style {
    backgroundColor: string
    color: string
  }

  const runtimeBody = {
    name: 'onda-runtime-tst',
    instance: () => {},
    parser: () => (csx: Csx = {}) =>
      ({ backgroundColor: csx?.bg ?? '', color: csx?.c ?? '' } as Style),
    compiler: () => (style: Style) =>
      `${style?.backgroundColor}${style?.color}`,
  }

  const runtime = createRuntime(runtimeBody)

  it('should not create a runtime with invalid a name', () => {
    expect(() =>
      createRuntime({
        name: 'test',
        instance: () => {},
        parser: () => (csx: Csx = {}) =>
          ({ backgroundColor: csx?.bg ?? '', color: csx?.c ?? '' } as Style),
        compiler: () => (style: Style) =>
          `${style?.backgroundColor}${style?.color}`,
      })
    ).toThrowError()
  })

  it('should be able to catch invalid runtimes', () => {
    expect(isValidRuntime(runtime)).toBeTruthy()
    expect(isValidRuntime(runtimeBody as any)).toBeFalsy()
  })

  it('should be able to return the runtime name', () => {
    expect(typeof getRuntimeName(runtime)).toBe('string')
    expect(getRuntimeName(runtime)).toEqual(runtimeBody.name)
  })

  it('should be able to return the runtime instance', () => {
    expect(typeof getInstance(runtime)).toBe('function')
    expect(getInstance(runtime)).toBe(runtimeBody.instance)
  })

  it('should be able to return the runtime parser', () => {
    expect(typeof getParser(runtime)).toBe('function')
    expect(getParser(runtime)).toBe(runtimeBody.parser)
  })

  it('should be able to return the runtime compiler', () => {
    expect(typeof getCompiler(runtime)).toBe('function')
    expect(getCompiler(runtime)).toBe(runtimeBody.compiler)
  })
})
