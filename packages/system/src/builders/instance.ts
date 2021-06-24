import { Runtime, getInstance } from '../runtime'

/**
 * Builds the runtime instance
 * @param params
 * @param runtime
 * @returns
 */
export function buildInstance<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(
  params: InstanceParams,
  runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>
) {
  return getInstance(runtime)(params)
}
