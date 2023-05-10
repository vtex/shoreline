import { get } from '@vtex/admin-ui-util'
import type { CSSObject } from './types'

const mixins = {
  text: {
    pageTitle: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-pageTitle)',
      fontSize: 'var(--aui-fs-pageTitle)',
      lineHeight: 'var(--aui--lh-pageTitle)',
      letterSpacing: 'var(--aui--ls-pageTitle)',
    },
    title1: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-title1)',
      fontSize: 'var(--aui-fs-title1)',
      lineHeight: 'var(--aui--lh-title1)',
      letterSpacing: 'var(--aui--ls-title1)',
    },
    title2: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-title2)',
      fontSize: 'var(--aui-fs-title2)',
      lineHeight: 'var(--aui--lh-title2)',
      letterSpacing: 'var(--aui--ls-title2)',
    },
    action1: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-action1)',
      fontSize: 'var(--aui-fs-action1)',
      lineHeight: 'var(--aui--lh-action1)',
      letterSpacing: 'var(--aui--ls-action1)',
    },
    action2: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-action2)',
      fontSize: 'var(--aui-fs-action2)',
      lineHeight: 'var(--aui--lh-action2)',
      letterSpacing: 'var(--aui--ls-action2)',
    },
    display: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-display)',
      fontSize: 'var(--aui-fs-display)',
      lineHeight: 'var(--aui--lh-display)',
      letterSpacing: 'var(--aui--ls-display)',
    },
    body: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-body)',
      fontSize: 'var(--aui-fs-body)',
      lineHeight: 'var(--aui--lh-body)',
      letterSpacing: 'var(--aui--ls-body)',
    },
    detail: {
      fontFamily: 'var(--aui-ff-sans)',
      fontVariationSettings: 'var(--aui--fvs-detail)',
      fontSize: 'var(--aui-fs-detail)',
      lineHeight: 'var(--aui--lh-detail)',
      letterSpacing: 'var(--aui--ls-detail)',
    },
    code: { fontFamily: 'var(--aui-ff-mono)' },
  },
}

export function isMixin(prop: string): boolean {
  return !!get(mixins, prop)
}

export function getMixin(prop: string, value: string): CSSObject {
  return get(mixins, `${prop}.${value}`, {})
}
