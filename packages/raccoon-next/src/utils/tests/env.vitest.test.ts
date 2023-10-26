/* eslint-disable @typescript-eslint/ban-ts-comment */
import { test, expect } from 'vitest'
import { isIframe, isDev } from '../env'

test('isIframe returns true when running in an iframe', () => {
  // Simulate running in an iframe
  globalThis.window = {} as any
  globalThis.top = {} as any

  expect(isIframe())

  // @ts-ignore
  delete globalThis.window
  // @ts-ignore
  delete globalThis.top
})

test('isIframe returns false when not running in an iframe', () => {
  globalThis.top = {} as any
  globalThis.window = globalThis.top as any

  expect(!isIframe())

  // @ts-ignore
  delete globalThis.window
  // @ts-ignore
  delete globalThis.top
})

test('isDev returns true when NODE_ENV is "development"', () => {
  process.env.NODE_ENV = 'development'

  expect(isDev())

  delete process.env.NODE_ENV
})

test('isDev returns false when NODE_ENV is not "development"', () => {
  process.env.NODE_ENV = 'production'

  expect(!isDev())

  delete process.env.NODE_ENV
})
