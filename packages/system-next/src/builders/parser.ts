import type { Runtime } from '../runtime'
import { getParser } from '../runtime'
import type { StepsInstance } from '../plugin'

/**
 * Builds the runtime parser
 * @param steps
 * @param runtime
 */
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
    exec: getParser(runtime)(steps),
  }
}
