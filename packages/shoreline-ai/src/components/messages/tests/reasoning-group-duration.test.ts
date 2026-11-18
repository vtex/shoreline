import { describe, expect, it } from '@vtex/shoreline-test-utils'

import { getGroupDuration, getGroupStatus } from '../ai-message-parts'

describe('getGroupDuration', () => {
  it('is undefined for missing, NaN, negative or non-number timing', () => {
    expect(getGroupDuration({})).toBeUndefined()
    expect(getGroupDuration({ timing: Number.NaN })).toBeUndefined()
    expect(
      getGroupDuration({ timing: Number.POSITIVE_INFINITY })
    ).toBeUndefined()
    expect(getGroupDuration({ timing: -1 })).toBeUndefined()
    expect(getGroupDuration({ timing: '5' })).toBeUndefined()
  })

  it('passes through a finite number >= 0', () => {
    expect(getGroupDuration({ timing: 0 })).toBe(0)
    expect(getGroupDuration({ timing: 1234 })).toBe(1234)
  })
})

describe('getGroupStatus', () => {
  it('maps running only for status.type running', () => {
    expect(getGroupStatus({ status: { type: 'running' } })).toBe('running')
    expect(getGroupStatus({ status: { type: 'complete' } })).toBe('complete')
    expect(getGroupStatus({})).toBe('complete')
  })
})
