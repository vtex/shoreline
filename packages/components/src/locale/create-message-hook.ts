import { useCallback } from 'react'
import { useLocale } from './use-locale'

/**
 * Create a Hook that extracts messages from the passed object
 * @example
 * const messages = {
 *   'en-US': {
 *     test: 'Test'
 *   },
 *   'pt-BR': {
 *     test: 'Teste'
 *   }
 * }
 *
 * const useMessage = createMessageHook(messages)
 * const getMessage - useMessage()
 * getMessage('test')
 */
export function createMessageHook<T extends string = ''>(
  messages: Record<string, Record<T, string>>
): (overrides?: Record<T, string>) => (id: T) => string {
  return function useMessage(overrides) {
    const locale = useLocale()

    return useCallback(
      (id) => {
        const query = `${locale}.${id}`
        const localizedString = get(messages, query, '')

        return overrides ? get(overrides, id, localizedString) : localizedString
      },
      [locale, overrides]
    )
  }
}

/**
 * Get value from a deeply nested object using a string path.
 * Memoizes the value.
 * @param obj - the object
 * @param path - the string path
 * @param def  - the fallback value
 */
export function get(
  obj: object | null | undefined,
  path: string | number | symbol,
  fallback?: any,
  index?: number
) {
  if (!obj) return fallback

  const key = typeof path === 'string' ? path.split('.') : [path]

  for (index = 0; index < key.length; index += 1) {
    if (!obj) break
    obj = (obj as any)[key[index]]
  }

  return obj === undefined ? fallback : obj
}
