import { useLocale } from '@react-aria/i18n'

/**
 * Returns the region from the locale
 */
export function useRegion(): string {
  const { locale } = useLocale()

  return locale.split('-')[1]
}
