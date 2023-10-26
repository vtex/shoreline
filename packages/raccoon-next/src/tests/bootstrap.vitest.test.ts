import { vi } from 'vitest'
import { connect } from '../boostrap'

test('connect function should listen for admin shell events', () => {
  const addEventListener = vi.spyOn(window, 'addEventListener')

  connect()
  expect(addEventListener).toHaveBeenCalled()
})

test.todo('bootstrap function should render component with challenge')
