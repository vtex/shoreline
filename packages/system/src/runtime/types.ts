import { StepsInstance } from '../plugin'

export type Parser<HumanReadableCSS = {}, MetaCSS = {}> = (
  csx?: HumanReadableCSS
) => MetaCSS

export interface RuntimeParams<HumanReadableCSS = {}, MetaCSS = {}> {
  name: string
  onParse: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
  onCompile?: any
}

export interface Runtime<HumanReadableCSS = {}, MetaCSS = {}> {
  name: string
  steps: {
    parse: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
    compile: any
  }
}

export interface RuntimeInstance<HumanReadableCSS = {}, MetaCSS = {}> {
  parse: {
    exec: Parser<HumanReadableCSS, MetaCSS>
  }
  compile: {
    exec: (meta: MetaCSS) => string
  }
}
