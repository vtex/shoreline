import {
  publishMessage,
  isAdminShellEvent,
  sendEventToEmbeddedApp,
  listenForAdminShellEvents,
} from '../message'
import { adminStore } from '../admin-store'
import { vi, test, expect } from '@vtex/shoreline-test-utils'

test('publishMessage should post message to parent window', () => {
  const mockPostMessage = vi.spyOn(window, 'postMessage')

  global.window = {
    parent: {
      postMessage: mockPostMessage,
    },
  } as any
  const params = {
    type: 'test-message',
    data: {},
  }

  publishMessage(params)
  expect(mockPostMessage).toHaveBeenCalledWith(
    {
      id: 'admin-ejected-app-message',
      ...params,
    },
    '*'
  )
})

test('isAdminShellEvent should return true for admin iframe events', () => {
  const event = {
    type: 'admin-iframe-message',
    data: {},
  }

  expect(isAdminShellEvent(event)).toBe(true)
})

test('sendEventToEmbeddedApp should post message to iframe content window', () => {
  const iframe = document.createElement('iframe') as any

  iframe.src = 'https://vtex.com'
  Object.defineProperty(iframe, 'contentWindow', {
    value: { postMessage: (_: any) => null },
  })

  const mockPostMessage = vi.spyOn(iframe.contentWindow, 'postMessage')

  const data = {
    test: 'data',
  } as any

  sendEventToEmbeddedApp(data, iframe)
  expect(mockPostMessage).toHaveBeenCalledWith(
    {
      type: 'admin-iframe-message',
      data,
    },
    'https://vtex.com'
  )
})

test('listenForAdminShellEvents should set adminStore when receiving admin iframe events', () => {
  const mockAdminStoreSet = vi.spyOn(adminStore, 'set') as any

  adminStore.set = mockAdminStoreSet
  const event = {
    type: 'admin-iframe-message',
    data: {
      test: 'data',
    },
  }

  const messageEvent = {
    data: event,
  }

  Object.defineProperty(window, 'addEventListener', {
    value: (_: any, callback: any) => {
      callback(messageEvent)
    },
  })
  Object.defineProperty(window, 'dispatchEvent', {
    value: (_: Event) => {
      return true
    },
  })

  listenForAdminShellEvents()
  window.dispatchEvent(new MessageEvent('message', messageEvent))
  expect(mockAdminStoreSet).toHaveBeenCalledWith(event.data)
})
