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
): () => (id: T) => string {
  return function useMessage() {
    const locale = useLocale()

    return useCallback((id) => {
      return messages?.[locale]?.[id] ?? ''
    }, [])
  }
}
