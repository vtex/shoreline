import '@testing-library/jest-dom/vitest'
import type { AsymmetricMatchersContaining, Assertion } from 'vitest'
import { test, describe, it, expect as globalExpect, vi } from 'vitest'
import {
  render,
  renderHook,
  act,
  screen,
  fireEvent,
} from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

globalExpect.extend(matchers)

interface CustomExpect
  extends Omit<Chai.ExpectStatic, 'not'>,
    AsymmetricMatchersContaining {
  <T>(actual: T, message?: string): Omit<Assertion<T>, 'not'> &
    matchers.TestingLibraryMatchers<void, T> & {
      not: Assertion<T> & matchers.TestingLibraryMatchers<void, T>
    }
  unreachable(message?: string): never
  soft<T>(actual: T, message?: string): Assertion<T>
  assertions(expected: number): void
  hasAssertions(): void
  anything(): any
  any(constructor: unknown): any
  getState(): any
  setState(state: Partial<any>): void
  not: <T>(
    actual: T,
    message?: string
  ) => Assertion<T> & matchers.TestingLibraryMatchers<void, T>
}

const expect: CustomExpect = globalExpect as unknown as CustomExpect

export {
  vi,
  expect,
  test,
  describe,
  it,
  render,
  renderHook,
  act,
  screen,
  fireEvent,
}
