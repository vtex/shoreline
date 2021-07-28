import type { Runtime } from '../runtime'
import { getCompiler } from '../runtime'

/**
 * Builds the runtime compiler
 * @param instance
 * @param runtime
 */
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
    exec: getCompiler(runtime)(instance),
  }
}
