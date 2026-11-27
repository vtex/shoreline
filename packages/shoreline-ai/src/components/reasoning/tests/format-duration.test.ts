import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { describe, expect, test } from 'vitest'

import { formatElapsed, formatReasoningDuration } from '../format-duration'
import { messages } from '../../messages/messages'

/** Reads the pt-BR catalog the way the message hook does. */
function ptBR(id: string, variables: Record<string, string | number> = {}) {
  const strings: Record<string, string> = messages['pt-BR']

  return Object.entries(variables).reduce(
    (text, [key, value]) => text.split(`{${key}}`).join(String(value)),
    strings[id] ?? ''
  )
}

describe('formatElapsed', () => {
  test.each([
    [40_000, 'en-US', '40s'],
    [65_000, 'en-US', '1m 5s'],
    [3_900_000, 'en-US', '1h 5m'],
    [40_000, 'pt-BR', '40 s'],
    [65_000, 'pt-BR', '1 min 5 s'],
    [400, 'en-US', '1s'],
  ])('formatElapsed(%i, %s) -> %s', (ms, locale, out) => {
    expect(formatElapsed(ms, locale)).toBe(out)
  })

  test.each([
    [40_000, '40s'],
    [65_000, '1m 5s'],
    [120_000, '2m'],
    [3_900_000, '1h 5m'],
  ])('formatElapsed(%i) with the pt-BR catalog -> %s', (ms, out) => {
    expect(formatElapsed(ms, 'pt-BR', ptBR)).toBe(out)
  })

  test('a locale with no catalog format keeps the Intl format', () => {
    expect(formatElapsed(65_000, 'es-ES', () => '')).toBe('1min 5s')
  })
})

describe('format-duration source', () => {
  test('spells the NBSP and NNBSP as escapes, not invisible characters', () => {
    const source = readFileSync(
      resolve(__dirname, '../format-duration.ts'),
      'utf8'
    )

    expect(source).not.toMatch(/[\u00A0\u202F]/)
    expect(source).toContain('\\u00A0')
    expect(source).toContain('\\u202F')
  })

  test('normalises both spaces to a plain space', () => {
    expect(formatElapsed(40_000, 'pt-BR')).not.toMatch(/[\u00A0\u202F]/)
  })
})

describe('formatReasoningDuration', () => {
  test.each([
    [40_000, 'pt-BR', '40 s'],
    [65_000, 'pt-BR', '1 min 5 s'],
    [120_000, 'pt-BR', '2 min'],
    [95_000, 'en-US', '1m 35s'],
    [3_900_000, 'en-US', '1h 5m'],
    [0, 'en-US', '1s'],
    [3_599_000, 'en-US', '59m 59s'],
    [3_599_600, 'en-US', '1h'],
  ])('formatReasoningDuration(%i, %s) -> %s', (ms, locale, out) => {
    expect(formatReasoningDuration(ms, locale)).toBe(out)
  })

  test('same format as the counter, with the pt-BR catalog', () => {
    expect(formatReasoningDuration(65_000, 'pt-BR', ptBR)).toBe('1m 5s')
    expect(formatReasoningDuration(40_000, 'pt-BR', ptBR)).toBe('40s')
  })

  test.each([undefined, Number.NaN, -1, Number.POSITIVE_INFINITY])(
    'formatReasoningDuration(%s) -> null',
    (ms) => {
      expect(formatReasoningDuration(ms as number, 'en-US')).toBeNull()
    }
  )
})
