import { join } from 'path'
import { lazyRuntime } from '../typescript-runtime'

test('should eval code from path', () => {
  const path = join(__dirname, 'fixtures/ts-config/shoreline.config.ts')
  const code = lazyRuntime()(path)

  expect(code.default.prefix).toStrictEqual('ts')
})
