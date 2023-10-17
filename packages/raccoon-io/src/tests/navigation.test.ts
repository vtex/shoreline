import { prepare, navigate } from '../navigation'

describe('prepare', () => {
  it('should return null adminShell and target when window.top is falsy', () => {
    const windowSpy = jest.spyOn(window, 'top', 'get')

    windowSpy.mockReturnValue(null)

    const result = prepare()

    expect(result.adminShell).toBeNull()
    expect(result.target).toBeNull()

    windowSpy.mockRestore()
  })

  it('should return adminShell and target when window.top is truthy', () => {
    const windowSpy = jest.spyOn(window, 'top', 'get')
    const expectedAdminShell = {} as Window

    windowSpy.mockReturnValue(expectedAdminShell)
    const expectedTarget = 'http://localhost'

    const result = prepare()

    expect(result.adminShell).toBe(expectedAdminShell)
    expect(result.target).toBe(expectedTarget)

    windowSpy.mockRestore()
  })
})

describe('navigate', () => {
  let originalPostMessage: any
  let mockPostMessage: jest.Mock
  let windowSpy: any

  beforeEach(() => {
    windowSpy = jest.spyOn(window, 'top', 'get')
    originalPostMessage = window.postMessage
    mockPostMessage = jest.fn()
    window.postMessage = mockPostMessage
  })

  afterEach(() => {
    window.postMessage = originalPostMessage
    windowSpy.mockRestore()
  })

  it('should post a message to the admin shell with the given pathname and expected type', () => {
    const pathname = '/admin/rocket/nextjs-internal-route'

    navigate(pathname)
    expect(mockPostMessage).toHaveBeenCalledWith(
      {
        type: 'top-level-navigation',
        pathname,
      },
      expect.any(String)
    )
  })

  it('should not post a message if admin shell (top window) or target is not defined', () => {
    const pathname = '/admin/rocket/nextjs-internal-route'

    windowSpy.mockImplementation(() => ({
      target: undefined,
    }))

    navigate(pathname)

    expect(mockPostMessage).not.toHaveBeenCalled()
  })

  it(`should not post a message if pathname doesn't start with "/"`, () => {
    const pathname = 'admin/rocket/nextjs-internal-route'

    navigate(pathname)

    expect(mockPostMessage).not.toHaveBeenCalled()
  })

  it('should catch and log any errors thrown by postMessage', () => {
    const pathname = '/admin/rocket/nextjs-internal-route'
    const error = new Error('postMessage failed')

    mockPostMessage.mockImplementation(() => {
      throw error
    })

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()

    navigate(pathname)
    expect(consoleSpy).toHaveBeenCalledWith(error)

    consoleSpy.mockRestore()
  })
})
