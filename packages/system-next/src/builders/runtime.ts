import { Runtime } from '../runtime'
import { StepsInstance } from '../plugin'
import { buildCompiler } from './compiler'
import { buildInstance } from './instance'
import { buildParser } from './parser'

/**
 * Builds the runtime calling the instance, parser and compiler builders.
 * @param params
 * @param steps
 * @param runtime
 */
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
