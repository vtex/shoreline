import { Runtime, getParser } from '../runtime'
import { StepsInstance } from '../plugin'

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
