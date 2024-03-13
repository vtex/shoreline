import { test, expect } from '@vtex/shoreline-test-utils'
import { tokens } from './fixtures/tokens'
import { TokenCollecton } from '../token-collection'

test('should work', async () => {
  const collection = new TokenCollecton({
    color: {
      blue: 'hsla(1, 2, 3)',
    },
    border: {
      main: {
        '*': '1px solid $color-blue',
        hover: '1px dashed $color-blue',
      },
    },
  })

  // console.log({
  //   base: tree.findToken('bg-base'),
  //   plain: tree.findToken('bg-base-plain'),
  //   gray: tree.findToken('color-gray-1'),
  // })

  // console.log(collection.getObjectRaw())
  // console.log(collection.getObject('snake'))

  // console.log({ raw: tree.getRawValue('bg-base-plain') })

  console.log(await collection.getCssCode())
  // console.log(collection.getObjectRaw())
  // console.log(collection.getObjectRaw())
  // console.log(await collection.getCssCode())
  // console.log(collection.getObject('camel'))

  expect(1 + 1).toBe(2)
})
