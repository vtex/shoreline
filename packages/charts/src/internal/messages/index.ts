import bg from './bg.json'
import de from './de.json'
import en from './en.json'
import es from './es.json'
import fr from './fr.json'
import it from './it.json'
import ja from './ja.json'
import ko from './ko.json'
import nl from './nl.json'
import pt from './pt.json'
import ro from './ro.json'
import th from './th.json'

/**
 * Shared chart internal messages, localized from the surrounding
 * `LocaleProvider`. Every chart uses the same set: the empty-state label and
 * the name of the series that aggregates the tail past `maxSeries`.
 */
export const chartMessages = {
  'en-US': en,
  'es-AR': es,
  'fr-FR': fr,
  'pt-BR': pt,
  'ja-JP': ja,
  'ko-KR': ko,
  'it-IT': it,
  'nl-NL': nl,
  'ro-RO': ro,
  'bg-BG': bg,
  'th-TH': th,
  'de-DE': de,
}

/**
 * Chart internal messages intl keys
 */
export type ChartMessagesKeys =
  /** Rendered in place of the chart when there is no data to display */
  | 'empty'
  /** Names the series that aggregates the tail of `series` */
  | 'others'

/**
 * Chart internal messages
 */
export type ChartMessages = Partial<Record<ChartMessagesKeys, string>>
