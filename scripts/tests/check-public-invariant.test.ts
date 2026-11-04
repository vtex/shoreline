import { describe, expect, it } from 'vitest'

import { findViolations } from '../check-public-invariant.mjs'

const SRC = 'packages/shoreline-ai/src/runtime/builder.ts'

describe('findViolations', () => {
  it('flags VTEXRuntimeConfig in a source file', () => {
    const violations = findViolations([
      {
        path: SRC,
        content: 'const a = 1\nexport type X = VTEXRuntimeConfig\n',
      },
    ])

    expect(violations).toHaveLength(1)
    expect(violations[0]).toMatchObject({
      file: SRC,
      line: 2,
      rule: 'VTEXRuntimeConfig',
    })
  })

  it('flags RawEnvelope outside the allowlist', () => {
    const violations = findViolations([
      { path: SRC, content: 'type Y = RawEnvelope' },
    ])

    expect(violations.map((v) => v.rule)).toEqual(['RawEnvelope'])
  })

  it('allows the JSDoc mention in types/public.ts', () => {
    const violations = findViolations([
      {
        path: 'packages/shoreline-ai/src/types/public.ts',
        content:
          ' * These types are backend-agnostic — they never reference RawEnvelope,',
      },
    ])

    expect(violations).toEqual([])
  })

  it('does not allow other RawEnvelope mentions in types/public.ts', () => {
    const violations = findViolations([
      {
        path: 'packages/shoreline-ai/src/types/public.ts',
        content: 'export type Z = RawEnvelope',
      },
    ])

    expect(violations).toHaveLength(1)
  })

  it('scans md and stories files', () => {
    const violations = findViolations([
      { path: 'packages/shoreline-ai/docs/X.md', content: 'uses RawEnvelope' },
      {
        path: 'packages/shoreline-ai/src/a/x.stories.tsx',
        content: 'const c: VTEXRuntimeConfig = {}',
      },
    ])

    expect(violations.map((v) => v.file)).toEqual([
      'packages/shoreline-ai/docs/X.md',
      'packages/shoreline-ai/src/a/x.stories.tsx',
    ])
  })

  it.each([
    ['appkey', 'x-vtex-api-AppKey: abc'],
    ['apptoken', 'headers.appToken = t'],
    ['vtexidclientautcookie', 'VtexIdclientAutCookie=abc'],
    ['Bearer ', 'Authorization: Bearer abc'],
    ['api[_-]?key', 'const API_KEY = "x"'],
  ])('flags credential pattern %s case-insensitively', (rule, content) => {
    const violations = findViolations([{ path: SRC, content }])

    expect(violations.map((v) => v.rule)).toContain(rule)
  })

  it('returns no violations for clean content', () => {
    expect(
      findViolations([{ path: SRC, content: 'export const ok = true\n' }])
    ).toEqual([])
  })
})
