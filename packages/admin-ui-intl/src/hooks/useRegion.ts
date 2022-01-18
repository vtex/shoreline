import { useLocale } from '@react-aria/i18n'

/**
 * Returns the region from the locale
 */
export function useRegion(): string {
  const { locale } = useLocale()

  // If the Intl.Locale API is available, use it to get the region for the locale.
  if ((Intl as any).Locale) {
    return new (Intl as any).Locale(locale).maximize().region
  }

  // If not, just try splitting the string.
  return locale.split('-')[1]
}
