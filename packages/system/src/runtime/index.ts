import { RuntimeParams, Runtime } from './types'
import { StepsInstance } from '../plugin'
export * from './types'

export function createRuntime<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  params: RuntimeParams<
    InstanceParams,
    InstanceReturn,
    HumanReadableCSS,
    MetaCSS
  >
): Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS> {
  return {
    name: params.name,
    steps: {
      instance: params.onInstance,
      parse: params.onParse,
      compile: params.onCompile,
    },
  }
}

export function buildInstance<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  params: InstanceParams,
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
) {
  return runtime.steps.instance(params)
}

export function buildParser<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  steps: StepsInstance,
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
) {
  return {
    exec: runtime.steps.parse(steps),
  }
}

export function buildCompiler<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  instance: InstanceReturn,
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
) {
  return {
    exec: runtime.steps.compile(instance),
  }
}

export function buildRuntime<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  params: InstanceParams,
  steps: StepsInstance,
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
) {
  const instance = buildInstance(params, runtime)
  const parse = buildParser(steps, runtime)
  const compile = buildCompiler(instance, runtime)
  return {
    instance,
    parse,
    compile,
    exec: (css: HumanReadableCSS) => compile.exec(parse.exec(css)),
  }
}
