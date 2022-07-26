import { renderHook } from '@testing-library/react-hooks'
import { tokens } from '@vtex/admin-ui-core'

import { useBreakpoint, getResponsiveValue } from '../hooks'

type Matches = boolean | Record<string, boolean>

const createMockMediaMatcher =
  (matchesOrMapOfMatches: Matches) => (qs: string) =>
    ({
      matches:
        typeof matchesOrMapOfMatches === 'object'
          ? matchesOrMapOfMatches[qs]
          : matchesOrMapOfMatches,
      addEventListener: () => {},
      removeEventListener: () => {},
    } as unknown as MediaQueryList)

const [mobile, tablet, desktop, widescreen] = tokens.breakpoints

describe('useBreakpoint test', () => {
  describe('Desktop environment', () => {
    beforeEach(() => {
      const matches = {
        [`(min-width: ${mobile})`]: true,
        [`(min-width: ${tablet})`]: true,
        [`(min-width: ${desktop})`]: true,
        [`(min-width: ${widescreen})`]: false,
      }

      window.matchMedia = createMockMediaMatcher(matches)
    })

    it('should match desktop breakpoint', () => {
      const {
        result: {
          current: { breakpoint },
        },
      } = renderHook(() => useBreakpoint())

      expect(breakpoint).toBe('desktop')
    })

    it('should not match tablet breakpoint', () => {
      const {
        result: {
          current: { breakpoint },
        },
      } = renderHook(() => useBreakpoint())

      expect(breakpoint).not.toBe('tablet')
    })
  })

  describe('Mobile environment', () => {
    beforeEach(() => {
      const matches = {
        [`(min-width: ${mobile})`]: true,
        [`(min-width: ${tablet})`]: false,
        [`(min-width: ${desktop})`]: false,
        [`(min-width: ${widescreen})`]: false,
      }

      window.matchMedia = createMockMediaMatcher(matches)
    })

    it('should match mobile breakpoint', () => {
      const {
        result: {
          current: { breakpoint },
        },
      } = renderHook(() => useBreakpoint())

      expect(breakpoint).toBe('mobile')
    })

    it('should not match desktop breakpoint', () => {
      const {
        result: {
          current: { breakpoint },
        },
      } = renderHook(() => useBreakpoint())

      expect(breakpoint).not.toBe('desktop')
    })
  })
})

describe('getResponsiveValue test', () => {
  it('should match mobile breakpoint', () => {
    const prop = getResponsiveValue({ mobile: 1, desktop: 2 }, 'mobile')

    expect(prop).toBe(1)
  })

  it('should match desktop breakpoint', () => {
    const prop = getResponsiveValue({ mobile: 1, desktop: 2 }, 'desktop')

    expect(prop).toBe(2)
  })

  it(`should match the tablet value, which is the minimum breakpoint when it doesn't have a direct match`, () => {
    const prop = getResponsiveValue({ mobile: 1, tablet: 2 }, 'widescreen')

    expect(prop).toBe(2)
  })

  it(`should match the mobile value, which is the minimum breakpoint when it doesn't have a direct match`, () => {
    const prop = getResponsiveValue({ mobile: 1, widescreen: 2 }, 'desktop')

    expect(prop).toBe(1)
  })
})
