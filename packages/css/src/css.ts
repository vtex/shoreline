import { CSSObject as EmotionCSSObject } from '@emotion/css'

import { get } from './util'
import { StyleObject, StyleProp, Theme } from './types'
import { Plugin } from './createPlugin'
import { plugins } from './plugins'

export function css(csx: StyleProp = {}) {
  return (theme: Theme = {}): EmotionCSSObject => {
    const emotionCSSObject: EmotionCSSObject = {}

    // onCreateAlias()
    const { alias } = createAliases(theme, plugins)
    // onCreateRule()
    const { findRule } = createRules(theme, plugins)

    // This will loop through all keys of csx
    for (const key in csx) {
      const emotionProp = alias(key)
      const token = csx[key as keyof typeof csx] // tokens are the rule values

      // Resolves nesting
      // onNest()
      if (token && typeof token === 'object') {
        emotionCSSObject[emotionProp] = css(token as StyleObject)(theme)
        continue
      }

      // onFindRule()
      const rule = findRule(emotionProp)

      // onTransform()
      const { transform } = createTransform(emotionProp, plugins)
      const value = transform(rule, token)

      // onSplit()
      const { shouldSplit, split } = createSplit(plugins)

      // onAssignFinalProperty
      if (typeof value === 'object') {
        Object.assign(emotionCSSObject, value)
      } else if (shouldSplit(emotionProp)) {
        const splitValue = split(emotionProp, value)
        Object.assign(emotionCSSObject, splitValue)
      } else {
        emotionCSSObject[emotionProp] = value
      }
    }

    return emotionCSSObject
  }
}

function createSplit(plugins: Plugin[]) {
  const splits = plugins
    .map((p) => p.onSplit)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(),
      }),
      {}
    ) as Record<string, string[]>

  function shouldSplit(prop: string) {
    return prop in splits
  }

  function split(prop: string, value: any) {
    const entries = splits[prop]

    return entries.reduce(
      (acc, entry) => ({
        ...acc,
        [entry]: value,
      }),
      {}
    )
  }

  return {
    splits,
    shouldSplit,
    split,
  }
}

function createTransform(prop: string, plugins: Plugin[]) {
  const transformations = plugins
    .map((p) => p.onTransform)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(),
      }),
      {}
    ) as Record<string, string>
  const transformOrGet = get(transformations, prop, get)

  function transform(rule: Record<string, string>, token: any) {
    return typeof transformOrGet === 'function'
      ? transformOrGet(rule, token, token)
      : transformOrGet
  }

  return {
    transformations,
    transform,
  }
}

function createRules(theme: Theme, plugins: Plugin[]) {
  const rules = plugins
    .map((p) => p.onCreateRule)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(),
      }),
      {}
    ) as Record<string, string>

  function findRule(prop: string) {
    const ruleId = prop in rules ? rules[prop] : undefined
    return ruleId ? theme?.[ruleId] : get(theme, prop, {})
  }

  return {
    findRule,
    rules,
  }
}

function createAliases(theme: Theme, plugins: Plugin[]) {
  const aliases = plugins
    .map((p) => p.onCreateAlias)
    .reduce(
      (acc, callbackRule) => ({
        ...acc,
        ...callbackRule(theme),
      }),
      {}
    ) as Record<string, string>

  function alias(candidate: string) {
    return aliases?.[candidate] ?? candidate
  }

  return {
    alias,
    aliases,
  }
}
