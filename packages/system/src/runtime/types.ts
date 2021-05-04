import { StepsInstance } from '../plugin'

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
  onInstance: (params: InstanceParams) => InstanceReturn
  onParse: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
  onCompile: (instance: InstanceReturn) => (meta: MetaCSS) => string
}

export interface Runtime<
  InstanceParams = {},
  InstanceReturn = {},
  HumanReadableCSS = {},
  MetaCSS = {}
> {
  name: string
  steps: {
    instance: (params: InstanceParams) => InstanceReturn
    parse: (steps: StepsInstance) => Parser<HumanReadableCSS, MetaCSS>
    compile: (instance: InstanceReturn) => (meta: MetaCSS) => string
  }
}

// export interface RuntimeInstance<
//   InstanceReturn = {},
//   HumanReadableCSS = {},
//   MetaCSS = {}
// > {
//   get: () => InstanceReturn
//   parse: {
//     exec: Parser<HumanReadableCSS, MetaCSS>
//   }
//   compile: {
//     exec: (meta: MetaCSS) => string
//   }
// }
