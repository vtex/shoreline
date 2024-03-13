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
export function createMessageHook(
  messages: Record<string, Record<string, string>>
): (
  overrides?: Record<string, string>
) => (id: string, variables?: Record<string, string | number>) => string {
  return function useMessage(overrides) {
    const locale = useLocale()

    return useCallback(
      (id, variables) => {
        const localizedMessages = messages[locale]
        const localizedString = _getMessage(
          localizedMessages,
          id,
          variables,
          ''
        )

        return overrides
          ? _getMessage(overrides, id, variables, localizedString)
          : localizedString
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
function _getMessage(
  obj: Record<string, string> | null | undefined,
  path: string,
  variables?: Record<string, string | number>,
  fallback?: any
) {
  const localizedMessage = obj?.[path]

  if (!localizedMessage) return fallback

  if (!variables) return localizedMessage

  const dynamicMessage = localizedMessage
    .split(' ')
    .map((word) => {
      const isDynamicWord = word.startsWith('{') && word.endsWith('}')

      if (!isDynamicWord) return word

      const dynamicValue = word.slice(1, -1)

      return variables[dynamicValue] ?? word
    })
    .join(' ')

  return dynamicMessage
}
