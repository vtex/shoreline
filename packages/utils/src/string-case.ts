import {
  pascalCase,
  camelCase,
  kebabCase,
  snakeCase,
  isUppercase,
  lowerFirst,
  splitByCase,
  upperFirst,
} from 'scule'

type StringCaseOptions = 'camel' | 'pascal' | 'snake' | 'kebab'

function stringCase(str: string, caseOption: StringCaseOptions = 'pascal') {
  switch (caseOption) {
    case 'camel':
      return camelCase(str)

    case 'pascal':
      return pascalCase(str)

    case 'snake':
      return snakeCase(str)

    case 'kebab':
      return kebabCase(str)
  }
}

export {
  pascalCase,
  camelCase,
  kebabCase,
  snakeCase,
  isUppercase,
  lowerFirst,
  splitByCase,
  upperFirst,
  stringCase,
}

export type { StringCaseOptions }
