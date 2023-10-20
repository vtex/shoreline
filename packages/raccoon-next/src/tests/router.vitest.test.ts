import { useNavigation } from '../router'
import { vi } from 'vitest'
import * as message from '../message'


test('navigate should publish message with path', async () => {
  vi.spyOn(message, 'publishMessage')
  const { navigate } = useNavigation()
  navigate('/test')

  expect(message.publishMessage).toHaveBeenCalledWith({
    type: 'navigation',
    data: {
      path: '/test',
    },
  })
})

test('navigate should log warning if path does not start with /', () => {
  const mockConsoleWarn = vi.spyOn(console, 'warn').mockImplementation(() => {})
  const { navigate } = useNavigation()
  navigate('test')
  expect(mockConsoleWarn).toHaveBeenCalledWith('The path must start with /')
})
