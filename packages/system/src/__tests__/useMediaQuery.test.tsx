import { renderHook } from '@testing-library/react-hooks'

import { useMediaQuery } from '../hooks'

type Matches = boolean | Record<string, boolean>

const createMockMediaMatcher = (matchesOrMapOfMatches: Matches) => (
  qs: string
) =>
  (({
    matches:
      typeof matchesOrMapOfMatches === 'object'
        ? matchesOrMapOfMatches[qs]
        : matchesOrMapOfMatches,
    addEventListener: () => {},
    removeEventListener: () => {},
  } as unknown) as MediaQueryList)

describe('useMediaQuery test', () => {
  describe('Desktop only environment', () => {
    beforeEach(() => {
      const matches = {
        '(min-width:640px)': false,
        '(min-width:720px)': false,
        '(min-width:1024px)': true,
      }

      window.matchMedia = createMockMediaMatcher(matches)
    })

    it('should match desktop query', () => {
      const {
        result: {
          current: [desktop],
        },
      } = renderHook(() => useMediaQuery('(min-width:1024px)'))

      expect(desktop).toBe(true)
    })

    it('should not match mobile and tablet query', () => {
      const {
        result: {
          current: [mobile, tablet],
        },
      } = renderHook(() =>
        useMediaQuery(['(min-width:640px)', '(min-width:720px)'])
      )

      const result = mobile && tablet
      expect(result).toBe(false)
    })
  })

  describe('Tablet and Desktop environments', () => {
    beforeEach(() => {
      const matches = {
        '(min-width:640px)': false,
        '(min-width:720px)': true,
        '(min-width:1024px)': true,
      }

      window.matchMedia = createMockMediaMatcher(matches)
    })

    it('should match tablet and desktop query', () => {
      const {
        result: {
          current: [tablet, desktop],
        },
      } = renderHook(() =>
        useMediaQuery(['(min-width:720px)', '(min-width:1024px)'])
      )

      const result = desktop && tablet
      expect(result).toBe(true)
    })

    it('should not match mobile query', () => {
      const {
        result: {
          current: [mobile],
        },
      } = renderHook(() =>
        useMediaQuery(['(min-width:640px)', '(min-width:720px)'])
      )

      expect(mobile).toBe(false)
    })
  })
})
