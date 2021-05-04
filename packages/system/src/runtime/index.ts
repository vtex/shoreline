import { RuntimeParams, Runtime } from './types'
import { StepsInstance } from '../plugin'

export function createRuntime<HumanReadableCSS = {}, MetaCSS = {}>(
  params: RuntimeParams<HumanReadableCSS, MetaCSS>
): Runtime<HumanReadableCSS, MetaCSS> {
  return {
    name: params.name,
    steps: {
      parse: params.onParse,
      compile: 'todo',
    },
  }
}

export function buildParser<HumanReadableCSS = {}, MetaCSS = {}>(
  steps: StepsInstance,
  runtime: Runtime<HumanReadableCSS, MetaCSS>
) {
  return {
    exec: runtime.steps.parse(steps),
  }
}

export function buildRuntime<HumanReadableCSS = {}, MetaCSS = {}>(
  steps: StepsInstance,
  runtime: Runtime<HumanReadableCSS, MetaCSS>
) {
  return {
    parse: buildParser(steps, runtime),
  }
}
