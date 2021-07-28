import invariant from 'tiny-invariant'

import type { StepsInstance } from './plugin'

const RUNTIME_NAME = Symbol('runtime name')
const RUNTIME_INSTANCE = Symbol('runtime instance')
const RUNTIME_PARSER = Symbol('runtime parser')
const RUNTIME_COMPILER = Symbol('runtime compiler')

/**
 * Creates a valid onda runtime
 * @example
 * createRuntime({
 *  name: 'onda-runtime-x',
 *  instance: () => {},
 *  parser: () => () => {},
 *  compiler: () => ({}) => ''
 * })
 */
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
  const invariants = getRuntimeInvariants(params)

  invariant(invariants.name.constraint, invariants.name.message)

  return {
    [RUNTIME_NAME]: params.name,
    [RUNTIME_INSTANCE]: params.instance,
    [RUNTIME_PARSER]: params.parser,
    [RUNTIME_COMPILER]: params.compiler,
  }
}

/**
 * Get runtime invariants
 * @param params
 */
function getRuntimeInvariants(params: RuntimeParams<any, any, any, any>) {
  return {
    name: {
      constraint: params.name.startsWith('onda-runtime-'),
      message: `Runtime names should start with onda-runtime-. This happened while trying to create the runtime: ${params.name}. Try onda-runtime-${params.name} instead`,
    },
  }
}

/**
 * Check if the passed runtime is valid
 * @param runtime
 */
export function isValidRuntime(runtime: Runtime<any, any, any, any>) {
  return (
    !!getRuntimeName(runtime) &&
    !!getInstance(runtime) &&
    !!getParser(runtime) &&
    !!getCompiler(runtime)
  )
}

/**
 * Gets the runtime name
 * @param runtime
 */
export function getRuntimeName<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>) {
  return runtime[RUNTIME_NAME]
}

/**
 * Gets the runtime instance
 * @param runtime
 */
export function getInstance<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>) {
  return runtime[RUNTIME_INSTANCE]
}

/**
 * Gets the runtime parser
 * @param runtime
 */
export function getParser<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>) {
  return runtime[RUNTIME_PARSER]
}

/**
 * Gets the runtime compiler
 * @param runtime
 */
export function getCompiler<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
>(runtime: Runtime<InstanceParams, InstanceReturn, HumanReadableCSS, MetaCSS>) {
  return runtime[RUNTIME_COMPILER]
}

export type Parser<HumanReadableCSS = {}, MetaCSS = {}> = (
  csx?: HumanReadableCSS
) => MetaCSS

export interface RuntimeParams<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
> {
  name: string
  instance: (params: InstanceParams) => InstanceReturn
  parser: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
  compiler: (instance: InstanceReturn) => (meta: MetaCSS) => string
}

export interface Runtime<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
> {
  [RUNTIME_NAME]: string
  [RUNTIME_INSTANCE]: (params: InstanceParams) => InstanceReturn
  [RUNTIME_PARSER]: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
  [RUNTIME_COMPILER]: (instance: InstanceReturn) => (meta: MetaCSS) => string
}
