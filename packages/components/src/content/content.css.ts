import { csx, dataAttr } from '@vtex/shoreline-vanilla-extract'

interface CreateQueryArgs {
  minWidth: number
  space: number
  narrowReduce?: number
}

function createQuery(args: CreateQueryArgs) {
  const { minWidth, space, narrowReduce = 1 } = args

  return {
    [`@container sl-container (min-width: ${minWidth}px)`]: {
      '> [data-sl-content]': {
        '--sl-content-space-horizontal': `$space-${space}`,
        '--sl-content-space-vertical': `$space-${space}`,
        [dataAttr('narrow', true)]: {
          '--sl-content-space-vertical': `$space-${space - narrowReduce}`,
        },
      },
    },
  }
}

const queries: CreateQueryArgs[] = [
  { minWidth: 0, space: 4 },
  { minWidth: 240, space: 6 },
  { minWidth: 380, space: 7 },
  { minWidth: 560, space: 8 },
  { minWidth: 800, space: 10, narrowReduce: 2 },
]

const containerQueries = queries.reduce(
  (acc, query) => ({ ...acc, ...createQuery(query) }),
  {}
)

export const containerStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-container]': {
        container: 'sl-container / inline-size',
      },
      ...containerQueries,
    },
  },
})

export const contentStyle = csx({
  '@layer': {
    components: {
      '&[data-sl-content]': {
        padding: '$content-space-vertical $content-space-horizontal',
      },
    },
  },
})
