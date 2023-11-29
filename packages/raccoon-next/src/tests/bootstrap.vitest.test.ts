import { vi, test, expect } from '@vtex/shoreline-test-utils'
import { connect } from '../boostrap'

test('connect function should listen for admin shell events', () => {
  const addEventListener = vi.spyOn(window, 'addEventListener')

  connect()
  expect(addEventListener).toHaveBeenCalled()
})
