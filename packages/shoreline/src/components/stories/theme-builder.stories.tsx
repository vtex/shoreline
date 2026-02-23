import { useState, useEffect, useRef } from 'react'
import '@vtex/shoreline/css'
import {
  Button,
  Stack,
  Flex,
  Heading,
  Text,
  Input,
  Search,
  Label,
  Checkbox,
  IconGearSix,
  IconArrowsClockwise,
  IconArrowLineDown,
  IconArrowLineUp,
  IconCaretDown,
  Divider,
  EmptyState,
  EmptyStateActions,
  EmptyStateIllustration,
  Tooltip,
} from '../../index'

// Importar exemplos de componentes existentes quando disponíveis
import {
  Simple as SelectSimple,
  Locale as SelectLocale,
  CustomPlaceholder as SelectCustomPlaceholder,
  Disabled as SelectDisabled,
  Controlled as SelectControlled,
  Multi as SelectMulti,
  AsField as SelectAsField,
  WithError as SelectWithError,
  Composition as SelectComposition,
  ListBox as SelectListBox,
  WithCombobox as SelectWithCombobox,
} from '../select/stories/examples.stories'
import {
  AsAlert as AlertAsAlert,
  Dismiss as AlertDismiss,
} from '../alert/stories/examples.stories'
import {
  AsLink as ButtonAsLink,
  UploadButton as ButtonUploadButton,
} from '../button/stories/examples.stories'
import {
  Controlled as CalendarControlled,
  Uncontrolled as CalendarUncontrolled,
} from '../calendar/stories/examples.stories'
import {
  AsField as CheckboxAsField,
  Controlled as CheckboxControlled,
  ReactHookForm as CheckboxReactHookForm,
  ReactHookFormGroup as CheckboxReactHookFormGroup,
  ReactWindow as CheckboxReactWindow,
} from '../checkbox/stories/examples.stories'
import {
  ClickBubble as ClickableClickBubble,
  ClickBubbleAllChildren as ClickableClickBubbleAllChildren,
} from '../clickable/stories/examples.stories'
import { Filtering as ComboboxFiltering } from '../combobox/stories/examples.stories'
import { AsChild as ComposeAsChild } from '../compose/stories/examples.stories'
import {
  Controlled as DateFieldControlled,
  Locale as DateFieldLocale,
  Granularity as DateFieldGranularity,
} from '../date-field/stories/examples.stories'
import {
  Default as DatePickerDefault,
  Controlled as DatePickerControlled,
  Locale as DatePickerLocale,
  AsField as DatePickerAsField,
  Disabled as DatePickerDisabled,
} from '../date-picker/stories/examples.stories'
import {
  WithField as DateRangePickerWithField,
  Controlled as DateRangePickerControlled,
  Locale as DateRangePickerLocale,
  Disabled as DateRangePickerDisabled,
} from '../date-range-picker/stories/examples.stories'
import {
  FilterError as EmptyStateFilterError,
  FilterNotFound as EmptyStateFilterNotFound,
} from '../empty-state/stories/examples.stories'
import { Controlled as FieldControlled } from '../field/stories/examples.stories'
import {
  Controlled as FilterControlled,
  CustomMessages as FilterCustomMessages,
  Localization as FilterLocalization,
  Composition as FilterComposition,
  WithCombobox as FilterWithCombobox,
} from '../filter/stories/examples.stories'
import { AsAnchor as IconButtonAsAnchor } from '../icon-button/stories/examples.stories'
import { Controlled as InputControlled } from '../input/stories/examples.stories'
import { Localization as LabelLocalization } from '../label/stories/examples.stories'
import {
  FullForm as MenuFullForm,
  Composition as MenuComposition,
} from '../menu/stories/examples.stories'
import { Size as ModalSize } from '../modal/stories/examples.stories'
import { Localization as PaginationLocalization } from '../pagination/stories/examples.stories'
import { Composition as PopoverComposition } from '../popover/stories/examples.stories'
import { Controlled as RadioControlled } from '../radio/stories/examples.stories'
import {
  Default as RangeCalendarDefault,
  Controlled as RangeCalendarControlled,
  Locale as RangeCalendarLocale,
} from '../range-calendar/stories/examples.stories'
import { RowAsLink as TableRowAsLink } from '../table/stories/examples.stories'
import {
  NoResize as TextareaNoResize,
  FormField as TextareaFormField,
  LongText as TextareaLongText,
} from '../textarea/stories/examples.stories'
import {
  AsChild as TextAsChild,
  Ref as TextRef,
} from '../text/stories/examples.stories'
import {
  Default as TimeInputDefault,
  WithError as TimeInputWithError,
  Controlled as TimeInputControlled,
  Locale as TimeInputLocale,
  Granularity as TimeInputGranularity,
} from '../time-input/stories/examples.stories'
import { ToastFunction as ToastToastFunction } from '../toast/stories/examples.stories'
import {
  Placement as TooltipPlacement,
  Controlled as TooltipControlled,
  Composition as TooltipComposition,
} from '../tooltip/stories/examples.stories'

// Importar exemplos de show.stories quando disponíveis
import { Show as AlertShow } from '../alert/stories/show.stories'
import { Show as ButtonShow } from '../button/stories/show.stories'
import { Show as CalendarShow } from '../calendar/stories/show.stories'
import { Show as CheckboxShow } from '../checkbox/stories/show.stories'
import { Show as ClickableShow } from '../clickable/stories/show.stories'
import { Show as ComboboxShow } from '../combobox/stories/show.stories'
import { Show as ComposeShow } from '../compose/stories/show.stories'
import { Show as DateFieldShow } from '../date-field/stories/show.stories'
import { Show as DatePickerShow } from '../date-picker/stories/show.stories'
import { Show as DateRangePickerShow } from '../date-range-picker/stories/show.stories'
import { Show as EmptyStateShowRaw } from '../empty-state/stories/show.stories'

// Wrapper para EmptyStateShow que requer prop size
const EmptyStateShow = () => <EmptyStateShowRaw size="medium" />
import { Show as FieldShow } from '../field/stories/show.stories'
import { Show as FilterShow } from '../filter/stories/show.stories'
import { Show as IconButtonShow } from '../icon-button/stories/show.stories'
import { Show as InputShow } from '../input/stories/show.stories'
import { Show as LabelShow } from '../label/stories/show.stories'
import { Show as MenuShow } from '../menu/stories/show.stories'
import { Show as PaginationShow } from '../pagination/stories/show.stories'
import { Show as PopoverShow } from '../popover/stories/show.stories'
import { Show as RadioShow } from '../radio/stories/show.stories'
import { Show as RangeCalendarShow } from '../range-calendar/stories/show.stories'
import { Show as SelectShow } from '../select/stories/show.stories'
import { Show as TableShow } from '../table/stories/show.stories'
import { Show as TextShow } from '../text/stories/show.stories'
import { Show as TextareaShow } from '../textarea/stories/show.stories'
import { Show as TimeInputShow } from '../time-input/stories/show.stories'
import { Show as ToastShow } from '../toast/stories/show.stories'
import { Show as TooltipShow } from '../tooltip/stories/show.stories'
import { Show as BleedShow } from '../bleed/stories/show.stories'
import { Show as CenterShow } from '../center/stories/show.stories'
import { Show as CollectionShow } from '../collection/stories/show.stories'
import { Play as ConfirmationModalShow } from '../confirmation-modal/stories/play.stories'
import { Show as ContentShow } from '../content/stories/show.stories'
import { Show as ContextualHelpShow } from '../contextual-help/stories/show.stories'
import { Show as DividerShow } from '../divider/stories/show.stories'
import { Show as FlexShow } from '../flex/stories/show.stories'
import { Show as GridShow } from '../grid/stories/show.stories'
import { Show as HeadingShow } from '../heading/stories/show.stories'
import { Show as LinkShow } from '../link/stories/show.stories'
import { Show as LinkBoxShow } from '../link-box/stories/show.stories'
import { Show as PageShow } from '../page/stories/show.stories'
import { Show as SearchShow } from '../search/stories/show.stories'
import { Show as SkeletonShow } from '../skeleton/stories/show.stories'
import { Show as SpinnerShow } from '../spinner/stories/show.stories'
import { Show as StackShow } from '../stack/stories/show.stories'
import { Show as TabShow } from '../tab/stories/show.stories'
import { Show as TagShow } from '../tag/stories/show.stories'
import { Controlled as DrawerControlled } from '../drawer/stories/controlled.stories'
import { ShortText as DrawerShortText } from '../drawer/stories/short-text.stories'
import { LongText as DrawerLongText } from '../drawer/stories/long-text.stories'
import { PopoverAsChild as DrawerPopoverAsChild } from '../drawer/stories/popover-as-child.stories'

// Tokens padrão do Sunrise extraídos do CSS
const SUNRISE_TOKENS: Record<string, string> = {
  '--sl-space-0': '0rem',
  '--sl-space-1': '0.25rem',
  '--sl-space-2': '0.5rem',
  '--sl-space-3': '0.75rem',
  '--sl-space-4': '1rem',
  '--sl-space-5': '1.25rem',
  '--sl-space-6': '1.5rem',
  '--sl-space-7': '1.75rem',
  '--sl-space-8': '2rem',
  '--sl-space-10': '2.5rem',
  '--sl-space-12': '3rem',
  '--sl-space-16': '4rem',
  '--sl-space-20': '5rem',
  '--sl-space-24': '6rem',
  '--sl-space-28': '7rem',
  '--sl-space-32': '8rem',
  '--sl-space-05': '0.125rem',
  '--sl-space-gap': 'var(--sl-space-4)',
  '--sl-color-gray-0': '#ffffff',
  '--sl-color-gray-1': '#f5f5f5',
  '--sl-color-gray-2': '#ebebeb',
  '--sl-color-gray-3': '#e0e0e0',
  '--sl-color-gray-4': '#d6d6d6',
  '--sl-color-gray-5': '#c2c2c2',
  '--sl-color-gray-6': '#adadad',
  '--sl-color-gray-7': '#999999',
  '--sl-color-gray-8': '#858585',
  '--sl-color-gray-9': '#707070',
  '--sl-color-gray-10': '#5c5c5c',
  '--sl-color-gray-11': '#3d3d3d',
  '--sl-color-gray-12': '#1f1f1f',
  '--sl-color-gray-13': '#000000',
  '--sl-color-red-1': '#fdf6f5',
  '--sl-color-red-2': '#ffedea',
  '--sl-color-red-3': '#ffdfd9',
  '--sl-color-red-4': '#ffd0c7',
  '--sl-color-red-5': '#ffbbad',
  '--sl-color-red-6': '#ff9e8b',
  '--sl-color-red-7': '#ff7f68',
  '--sl-color-red-8': '#f95d47',
  '--sl-color-red-9': '#ec3727',
  '--sl-color-red-10': '#d31a15',
  '--sl-color-red-11': '#b40202',
  '--sl-color-red-12': '#940303',
  '--sl-color-red-13': '#720000',
  '--sl-color-orange-1': '#fdf5e9',
  '--sl-color-orange-2': '#ffedcd',
  '--sl-color-orange-3': '#ffe0ae',
  '--sl-color-orange-4': '#fed392',
  '--sl-color-orange-5': '#febc64',
  '--sl-color-orange-6': '#ffa138',
  '--sl-color-orange-7': '#f78612',
  '--sl-color-orange-8': '#e57001',
  '--sl-color-orange-9': '#cc5e01',
  '--sl-color-orange-10': '#b24d01',
  '--sl-color-orange-11': '#963e01',
  '--sl-color-orange-12': '#7b3001',
  '--sl-color-orange-13': '#622401',
  '--sl-color-yellow-1': '#fbf7d4',
  '--sl-color-yellow-2': '#fdf5ad',
  '--sl-color-yellow-3': '#faec6d',
  '--sl-color-yellow-4': '#fade1e',
  '--sl-color-yellow-5': '#e9c701',
  '--sl-color-yellow-6': '#d8b401',
  '--sl-color-yellow-7': '#c5a001',
  '--sl-color-yellow-8': '#b18d01',
  '--sl-color-yellow-9': '#9c7901',
  '--sl-color-yellow-10': '#866701',
  '--sl-color-yellow-11': '#715401',
  '--sl-color-yellow-12': '#5c4401',
  '--sl-color-yellow-13': '#493401',
  '--sl-color-green-1': '#e9fce3',
  '--sl-color-green-2': '#cefdc0',
  '--sl-color-green-3': '#aff79e',
  '--sl-color-green-4': '#97ef86',
  '--sl-color-green-5': '#74e26c',
  '--sl-color-green-6': '#4fd051',
  '--sl-color-green-7': '#28bc37',
  '--sl-color-green-8': '#08a822',
  '--sl-color-green-9': '#019213',
  '--sl-color-green-10': '#017d10',
  '--sl-color-green-11': '#016810',
  '--sl-color-green-12': '#01540e',
  '--sl-color-green-13': '#01410b',
  '--sl-color-teal-1': '#e9faf8',
  '--sl-color-teal-2': '#cff8f4',
  '--sl-color-teal-3': '#abf2eb',
  '--sl-color-teal-4': '#8deae3',
  '--sl-color-teal-5': '#66dbd3',
  '--sl-color-teal-6': '#40cac2',
  '--sl-color-teal-7': '#10b6af',
  '--sl-color-teal-8': '#01a29b',
  '--sl-color-teal-9': '#018d88',
  '--sl-color-teal-10': '#017873',
  '--sl-color-teal-11': '#016460',
  '--sl-color-teal-12': '#0d504d',
  '--sl-color-teal-13': '#133d3b',
  '--sl-color-blue-1': '#f1f8fd',
  '--sl-color-blue-2': '#e1f3ff',
  '--sl-color-blue-3': '#cbe9ff',
  '--sl-color-blue-4': '#b6dfff',
  '--sl-color-blue-5': '#97cffe',
  '--sl-color-blue-6': '#79bcfb',
  '--sl-color-blue-7': '#5aa8f7',
  '--sl-color-blue-8': '#3993f4',
  '--sl-color-blue-9': '#157bf4',
  '--sl-color-blue-10': '#0366dd',
  '--sl-color-blue-11': '#0155b7',
  '--sl-color-blue-12': '#014592',
  '--sl-color-blue-13': '#013672',
  '--sl-color-purple-1': '#f9f5fd',
  '--sl-color-purple-2': '#f5eafe',
  '--sl-color-purple-3': '#eddcfe',
  '--sl-color-purple-4': '#e5cffe',
  '--sl-color-purple-5': '#dabafd',
  '--sl-color-purple-6': '#cba3fc',
  '--sl-color-purple-7': '#bc8afb',
  '--sl-color-purple-8': '#ad71f8',
  '--sl-color-purple-9': '#9c56f3',
  '--sl-color-purple-10': '#883ce6',
  '--sl-color-purple-11': '#7225d2',
  '--sl-color-purple-12': '#5c12b6',
  '--sl-color-purple-13': '#460b93',
  '--sl-color-pink-1': '#fdf5f7',
  '--sl-color-pink-2': '#ffebf2',
  '--sl-color-pink-3': '#ffdfeb',
  '--sl-color-pink-4': '#ffc8dc',
  '--sl-color-pink-5': '#feb2cd',
  '--sl-color-pink-6': '#ff98bf',
  '--sl-color-pink-7': '#fe78ac',
  '--sl-color-pink-8': '#ef5997',
  '--sl-color-pink-9': '#de387f',
  '--sl-color-pink-10': '#ca226a',
  '--sl-color-pink-11': '#af0956',
  '--sl-color-pink-12': '#8f0246',
  '--sl-color-pink-13': '#74043b',
  '--sl-color-cyan-1': '#e6fafd',
  '--sl-color-cyan-2': '#c6f9ff',
  '--sl-color-cyan-3': '#a5f1ff',
  '--sl-color-cyan-4': '#89e8fb',
  '--sl-color-cyan-5': '#61d9f4',
  '--sl-color-cyan-6': '#34c6e9',
  '--sl-color-cyan-7': '#13b1db',
  '--sl-color-cyan-8': '#029dc9',
  '--sl-color-cyan-9': '#0187b5',
  '--sl-color-cyan-10': '#0172a0',
  '--sl-color-cyan-11': '#015e8a',
  '--sl-color-cyan-12': '#014b74',
  '--sl-color-cyan-13': '#013a5e',
  '--sl-fg-base': 'var(--sl-color-gray-12)',
  '--sl-fg-base-soft': 'var(--sl-color-gray-9)',
  '--sl-fg-base-disabled': 'var(--sl-color-gray-7)',
  '--sl-fg-inverted': 'var(--sl-color-gray-0)',
  '--sl-fg-warning': 'var(--sl-color-yellow-9)',
  '--sl-fg-success': 'var(--sl-color-green-9)',
  '--sl-fg-informational': 'var(--sl-color-blue-9)',
  '--sl-fg-muted': 'var(--sl-color-gray-11)',
  '--sl-fg-muted-hover': 'var(--sl-color-gray-12)',
  '--sl-fg-muted-pressed': 'var(--sl-color-gray-13)',
  '--sl-fg-accent': 'var(--sl-color-blue-10)',
  '--sl-fg-accent-hover': 'var(--sl-color-blue-11)',
  '--sl-fg-accent-pressed': 'var(--sl-color-blue-12)',
  '--sl-fg-critical': 'var(--sl-color-red-9)',
  '--sl-fg-critical-hover': 'var(--sl-color-red-10)',
  '--sl-fg-critical-pressed': 'var(--sl-color-red-11)',
  '--sl-bg-base': 'var(--sl-color-gray-0)',
  '--sl-bg-base-disabled':
    'color-mix(in srgb, var(--sl-color-gray-12) 5.0%, transparent)',
  '--sl-bg-base-strong': 'var(--sl-color-gray-3)',
  '--sl-bg-base-strong-disabled': 'var(--sl-color-gray-6)',
  '--sl-bg-base-soft': 'var(--sl-color-gray-1)',
  '--sl-bg-warning': 'var(--sl-color-yellow-1)',
  '--sl-bg-success': 'var(--sl-color-green-1)',
  '--sl-bg-informational': 'var(--sl-color-blue-1)',
  '--sl-bg-inverted': 'var(--sl-color-gray-12)',
  '--sl-bg-inverted-strong':
    'color-mix(in srgb, var(--sl-color-gray-12) 50.0%, transparent)',
  '--sl-bg-muted':
    'color-mix(in srgb, var(--sl-color-gray-12) 5.0%, transparent)',
  '--sl-bg-muted-hover':
    'color-mix(in srgb, var(--sl-color-gray-12) 10.0%, transparent)',
  '--sl-bg-muted-pressed':
    'color-mix(in srgb, var(--sl-color-gray-12) 15%, transparent)',
  '--sl-bg-muted-plain':
    'color-mix(in srgb, var(--sl-color-gray-12) 0.0%, transparent)',
  '--sl-bg-muted-plain-hover':
    'color-mix(in srgb, var(--sl-color-gray-12) 5.0%, transparent)',
  '--sl-bg-muted-plain-pressed':
    'color-mix(in srgb, var(--sl-color-gray-12) 10.0%, transparent)',
  '--sl-bg-accent': 'var(--sl-color-blue-2)',
  '--sl-bg-accent-hover': 'var(--sl-color-blue-3)',
  '--sl-bg-accent-pressed': 'var(--sl-color-blue-4)',
  '--sl-bg-accent-plain':
    'color-mix(in srgb, var(--sl-color-blue-10) 0.0%, transparent)',
  '--sl-bg-accent-plain-hover':
    'color-mix(in srgb, var(--sl-color-blue-10) 5.0%, transparent)',
  '--sl-bg-accent-plain-pressed':
    'color-mix(in srgb, var(--sl-color-blue-10) 10.0%, transparent)',
  '--sl-bg-accent-strong': 'var(--sl-color-blue-10)',
  '--sl-bg-accent-strong-hover': 'var(--sl-color-blue-11)',
  '--sl-bg-accent-strong-pressed': 'var(--sl-color-blue-12)',
  '--sl-bg-critical': 'var(--sl-color-red-1)',
  '--sl-bg-critical-plain':
    'color-mix(in srgb, var(--sl-color-red-10) 0.0%, transparent)',
  '--sl-bg-critical-plain-hover':
    'color-mix(in srgb, var(--sl-color-red-10) 5.0%, transparent)',
  '--sl-bg-critical-plain-pressed':
    'color-mix(in srgb, var(--sl-color-red-10) 10.0%, transparent)',
  '--sl-bg-critical-strong': 'var(--sl-color-red-10)',
  '--sl-bg-critical-strong-hover': 'var(--sl-color-red-11)',
  '--sl-bg-critical-strong-pressed': 'var(--sl-color-red-12)',
  '--sl-border-base': '1px solid var(--sl-color-gray-3)',
  '--sl-border-base-disabled': '1px solid var(--sl-color-gray-6)',
  '--sl-border-base-strong': '1px solid var(--sl-color-gray-5)',
  '--sl-border-base-strong-hover': '1px solid var(--sl-color-gray-6)',
  '--sl-border-success': '1px solid var(--sl-color-green-3)',
  '--sl-border-informational': '1px solid var(--sl-color-blue-3)',
  '--sl-border-warning': '1px solid var(--sl-color-yellow-3)',
  '--sl-border-accent': '1px solid var(--sl-color-blue-3)',
  '--sl-border-accent-strong': '1px solid var(--sl-color-blue-10)',
  '--sl-border-accent-strong-hover': '1px solid var(--sl-color-blue-11)',
  '--sl-border-critical': '1px solid var(--sl-color-red-3)',
  '--sl-border-critical-strong': '1px solid var(--sl-color-red-8)',
  '--sl-border-critical-strong-hover': '1px solid var(--sl-color-red-9)',
  '--sl-radius-0': '0rem',
  '--sl-radius-1': '0.25rem',
  '--sl-radius-2': '0.5rem',
  '--sl-radius-3': '0.75rem',
  '--sl-radius-full': '9999rem',
  '--sl-focus-ring-base':
    '0rem 0rem 0rem 0.0625rem var(--sl-color-gray-0), 0rem 0rem 0rem 0.1875rem var(--sl-color-gray-5)',
  '--sl-focus-ring-critical':
    '0rem 0rem 0rem 0.0625rem var(--sl-color-gray-0), 0rem 0rem 0rem 0.1875rem var(--sl-color-red-6)',
  '--sl-focus-ring-accent':
    '0rem 0rem 0rem 0.0625rem var(--sl-color-gray-0), 0rem 0rem 0rem 0.1875rem var(--sl-color-blue-6)',
  '--sl-shadow-1': '0rem 0.25rem 1rem 0rem rgba(0, 0, 0, 0.16)',
  '--sl-shadow-2': '0rem 1.5rem 3rem 0rem rgba(0, 0, 0, 0.16)',
  '--sl-z-1': '0',
  '--sl-z-2': '100',
  '--sl-z-3': '200',
  '--sl-z-4': '300',
  '--sl-z-5': '400',
  '--sl-z-6': '500',
  '--sl-z-7': '600',
  '--sl-z-8': '700',
  '--sl-z-9': '800',
  '--sl-z-10': '900',
  '--sl-font-family-sans':
    '"Inter", -apple-system, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, BlinkMacSystemFont, sans-serif',
  '--sl-font-weight-regular': '400',
  '--sl-font-weight-medium': '500',
  '--sl-font-weight-semibold': '600',
  '--sl-font-size-1': '0.75rem',
  '--sl-font-size-2': '0.875rem',
  '--sl-font-size-3': '1rem',
  '--sl-font-size-4': '1.25rem',
  '--sl-font-size-5': '1.5rem',
  '--sl-letter-spacing-1': '0rem',
  '--sl-letter-spacing-2': '-0.00875rem',
  '--sl-letter-spacing-3': '-0.02rem',
  '--sl-letter-spacing-4': '-0.04rem',
  '--sl-line-height-1': '1rem',
  '--sl-line-height-2': '1.25rem',
  '--sl-line-height-3': '1.5rem',
  '--sl-line-height-4': '1.75rem',
  '--sl-line-height-5': '2rem',
  '--sl-text-caption-1-font':
    'var(--sl-font-weight-medium) var(--sl-font-size-1) / var(--sl-line-height-1) var(--sl-font-family-sans)',
  '--sl-text-caption-1-letter-spacing': 'var(--sl-letter-spacing-1)',
  '--sl-text-caption-2-font':
    'var(--sl-font-weight-regular) var(--sl-font-size-1) / var(--sl-line-height-1) var(--sl-font-family-sans)',
  '--sl-text-caption-2-letter-spacing': 'var(--sl-letter-spacing-1)',
  '--sl-text-action-font':
    'var(--sl-font-weight-semibold) var(--sl-font-size-2) / var(--sl-line-height-2) var(--sl-font-family-sans)',
  '--sl-text-action-letter-spacing': 'var(--sl-letter-spacing-2)',
  '--sl-text-emphasis-font':
    'var(--sl-font-weight-medium) var(--sl-font-size-2) / var(--sl-line-height-2) var(--sl-font-family-sans)',
  '--sl-text-emphasis-letter-spacing': 'var(--sl-letter-spacing-2)',
  '--sl-text-body-font':
    'var(--sl-font-weight-regular) var(--sl-font-size-2) / var(--sl-line-height-2) var(--sl-font-family-sans)',
  '--sl-text-body-letter-spacing': 'var(--sl-letter-spacing-2)',
  '--sl-text-display-1-font':
    'var(--sl-font-weight-semibold) var(--sl-font-size-5) / var(--sl-line-height-5) var(--sl-font-family-sans)',
  '--sl-text-display-1-letter-spacing': 'var(--sl-letter-spacing-4)',
  '--sl-text-display-2-font':
    'var(--sl-font-weight-semibold) var(--sl-font-size-4) / var(--sl-line-height-4) var(--sl-font-family-sans)',
  '--sl-text-display-2-letter-spacing': 'var(--sl-letter-spacing-4)',
  '--sl-text-display-3-font':
    'var(--sl-font-weight-semibold) var(--sl-font-size-3) / var(--sl-line-height-3) var(--sl-font-family-sans)',
  '--sl-text-display-3-letter-spacing': 'var(--sl-letter-spacing-3)',
  '--sl-text-display-4-font':
    'var(--sl-font-weight-regular) var(--sl-font-size-3) / var(--sl-line-height-3) var(--sl-font-family-sans)',
  '--sl-text-display-4-letter-spacing': 'var(--sl-letter-spacing-3)',
}

const STORAGE_KEY = 'shoreline-theme-builder-tokens'
const STORAGE_KEY_COMPONENTS = 'shoreline-theme-builder-selected-components'

// Lista de componentes disponíveis
const AVAILABLE_COMPONENTS = [
  'Alert',
  'Bleed',
  'Button',
  'Calendar',
  'Center',
  'Checkbox',
  'Clickable',
  'Collection',
  'Combobox',
  'Compose',
  'ConfirmationModal',
  'Content',
  'ContextualHelp',
  'DateField',
  'DatePicker',
  'DateRangePicker',
  'Divider',
  'Drawer',
  'EmptyState',
  'Field',
  'Filter',
  'Flex',
  'Grid',
  'Heading',
  'IconButton',
  'Input',
  'Label',
  'Link',
  'LinkBox',
  'Menu',
  'Modal',
  'Page',
  'Pagination',
  'Popover',
  'Radio',
  'RangeCalendar',
  'Search',
  'Select',
  'Skeleton',
  'Spinner',
  'Stack',
  'Tab',
  'Table',
  'Tag',
  'Text',
  'Textarea',
  'TimeInput',
  'Toast',
  'Tooltip',
]

// Mapeamento de componentes para funções de exemplo importadas (pode ser um único componente ou array)
const COMPONENT_EXAMPLES: Record<
  string,
  React.ComponentType | Array<{ label: string; Component: React.ComponentType }>
> = {
  Alert: [
    { label: 'As Alert', Component: AlertAsAlert },
    { label: 'Dismiss', Component: AlertDismiss },
    { label: 'Show', Component: AlertShow },
  ],
  Bleed: [{ label: 'Show', Component: BleedShow }],
  Button: [
    { label: 'As Link', Component: ButtonAsLink },
    { label: 'Upload Button', Component: ButtonUploadButton },
    { label: 'Show', Component: ButtonShow },
  ],
  Calendar: [
    { label: 'Controlled', Component: CalendarControlled },
    { label: 'Uncontrolled', Component: CalendarUncontrolled },
    { label: 'Show', Component: CalendarShow },
  ],
  Center: [{ label: 'Show', Component: CenterShow }],
  Checkbox: [
    { label: 'As Field', Component: CheckboxAsField },
    { label: 'Controlled', Component: CheckboxControlled },
    { label: 'React Hook Form', Component: CheckboxReactHookForm },
    { label: 'React Hook Form Group', Component: CheckboxReactHookFormGroup },
    { label: 'React Window', Component: CheckboxReactWindow },
    { label: 'Show', Component: CheckboxShow },
  ],
  Clickable: [
    { label: 'Click Bubble', Component: ClickableClickBubble },
    {
      label: 'Click Bubble All Children',
      Component: ClickableClickBubbleAllChildren,
    },
    { label: 'Show', Component: ClickableShow },
  ],
  Collection: [{ label: 'Show', Component: CollectionShow }],
  Combobox: [
    { label: 'Filtering', Component: ComboboxFiltering },
    { label: 'Show', Component: ComboboxShow },
  ],
  Compose: [
    { label: 'As Child', Component: ComposeAsChild },
    { label: 'Show', Component: ComposeShow },
  ],
  ConfirmationModal: [
    { label: 'Show', Component: ConfirmationModalShow as any },
  ],
  Content: [{ label: 'Show', Component: ContentShow }],
  ContextualHelp: [{ label: 'Show', Component: ContextualHelpShow }],
  DateField: [
    { label: 'Controlled', Component: DateFieldControlled },
    { label: 'Locale', Component: DateFieldLocale },
    { label: 'Granularity', Component: DateFieldGranularity },
    { label: 'Show', Component: DateFieldShow },
  ],
  DatePicker: [
    { label: 'Default', Component: DatePickerDefault },
    { label: 'Controlled', Component: DatePickerControlled },
    { label: 'Locale', Component: DatePickerLocale },
    { label: 'As Field', Component: DatePickerAsField },
    { label: 'Disabled', Component: DatePickerDisabled },
    { label: 'Show', Component: DatePickerShow },
  ],
  DateRangePicker: [
    { label: 'With Field', Component: DateRangePickerWithField },
    { label: 'Controlled', Component: DateRangePickerControlled },
    { label: 'Locale', Component: DateRangePickerLocale },
    { label: 'Disabled', Component: DateRangePickerDisabled },
    { label: 'Show', Component: DateRangePickerShow },
  ],
  Divider: [{ label: 'Show', Component: DividerShow }],
  Drawer: [
    { label: 'Controlled', Component: DrawerControlled },
    { label: 'Short Text', Component: DrawerShortText },
    { label: 'Long Text', Component: DrawerLongText },
    { label: 'Popover As Child', Component: DrawerPopoverAsChild },
  ],
  EmptyState: [
    { label: 'Filter Error', Component: EmptyStateFilterError },
    { label: 'Filter Not Found', Component: EmptyStateFilterNotFound },
    { label: 'Show', Component: EmptyStateShow },
  ],
  Field: [
    { label: 'Controlled', Component: FieldControlled },
    { label: 'Show', Component: FieldShow },
  ],
  Filter: [
    { label: 'Controlled', Component: FilterControlled },
    { label: 'Custom Messages', Component: FilterCustomMessages },
    { label: 'Localization', Component: FilterLocalization },
    { label: 'Composition', Component: FilterComposition },
    { label: 'With Combobox', Component: FilterWithCombobox },
    { label: 'Show', Component: FilterShow },
  ],
  Flex: [{ label: 'Show', Component: FlexShow }],
  Grid: [{ label: 'Show', Component: GridShow }],
  Heading: [{ label: 'Show', Component: HeadingShow }],
  IconButton: [
    { label: 'As Anchor', Component: IconButtonAsAnchor },
    { label: 'Show', Component: IconButtonShow },
  ],
  Input: [
    { label: 'Controlled', Component: InputControlled },
    { label: 'Show', Component: InputShow },
  ],
  Label: [
    { label: 'Localization', Component: LabelLocalization },
    { label: 'Show', Component: LabelShow },
  ],
  Link: [{ label: 'Show', Component: LinkShow }],
  LinkBox: [{ label: 'Show', Component: LinkBoxShow }],
  Menu: [
    { label: 'Full Form', Component: MenuFullForm },
    { label: 'Composition', Component: MenuComposition },
    { label: 'Show', Component: MenuShow },
  ],
  Modal: [{ label: 'Size', Component: ModalSize }],
  Page: [{ label: 'Show', Component: PageShow }],
  Pagination: [
    { label: 'Localization', Component: PaginationLocalization },
    { label: 'Show', Component: PaginationShow },
  ],
  Popover: [
    { label: 'Composition', Component: PopoverComposition },
    { label: 'Show', Component: PopoverShow },
  ],
  Radio: [
    { label: 'Controlled', Component: RadioControlled },
    { label: 'Show', Component: RadioShow },
  ],
  RangeCalendar: [
    { label: 'Default', Component: RangeCalendarDefault },
    { label: 'Controlled', Component: RangeCalendarControlled },
    { label: 'Locale', Component: RangeCalendarLocale },
    { label: 'Show', Component: RangeCalendarShow },
  ],
  Search: [{ label: 'Show', Component: SearchShow }],
  Select: [
    { label: 'Simple', Component: SelectSimple },
    { label: 'Locale', Component: SelectLocale },
    { label: 'Custom Placeholder', Component: SelectCustomPlaceholder },
    { label: 'Disabled', Component: SelectDisabled },
    { label: 'Controlled', Component: SelectControlled },
    { label: 'Multi', Component: SelectMulti },
    { label: 'As Field', Component: SelectAsField },
    { label: 'With Error', Component: SelectWithError },
    { label: 'Composition', Component: SelectComposition },
    { label: 'ListBox', Component: SelectListBox },
    { label: 'With Combobox', Component: SelectWithCombobox },
    { label: 'Show', Component: SelectShow },
  ],
  Skeleton: [{ label: 'Show', Component: SkeletonShow }],
  Spinner: [{ label: 'Show', Component: SpinnerShow }],
  Stack: [{ label: 'Show', Component: StackShow }],
  Tab: [{ label: 'Show', Component: TabShow }],
  Table: [
    { label: 'Row As Link', Component: TableRowAsLink },
    { label: 'Show', Component: TableShow },
  ],
  Tag: [{ label: 'Show', Component: TagShow }],
  Text: [
    { label: 'As Child', Component: TextAsChild },
    { label: 'Ref', Component: TextRef },
    { label: 'Show', Component: TextShow },
  ],
  Textarea: [
    { label: 'No Resize', Component: TextareaNoResize },
    { label: 'Form Field', Component: TextareaFormField },
    { label: 'Long Text', Component: TextareaLongText },
    { label: 'Show', Component: TextareaShow },
  ],
  TimeInput: [
    { label: 'Default', Component: TimeInputDefault },
    { label: 'With Error', Component: TimeInputWithError },
    { label: 'Controlled', Component: TimeInputControlled },
    { label: 'Locale', Component: TimeInputLocale },
    { label: 'Granularity', Component: TimeInputGranularity },
    { label: 'Show', Component: TimeInputShow },
  ],
  Toast: [
    { label: 'Toast Function', Component: ToastToastFunction },
    { label: 'Show', Component: ToastShow },
  ],
  Tooltip: [
    { label: 'Placement', Component: TooltipPlacement },
    { label: 'Controlled', Component: TooltipControlled },
    { label: 'Composition', Component: TooltipComposition },
    { label: 'Show', Component: TooltipShow },
  ],
}

interface TokenGroup {
  label: string
  tokens: string[]
}

const TOKEN_GROUPS: TokenGroup[] = [
  {
    label: 'Cores Primitivas - Gray',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-gray-')
    ),
  },
  {
    label: 'Cores Primitivas - Red',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-red-')
    ),
  },
  {
    label: 'Cores Primitivas - Orange',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-orange-')
    ),
  },
  {
    label: 'Cores Primitivas - Yellow',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-yellow-')
    ),
  },
  {
    label: 'Cores Primitivas - Green',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-green-')
    ),
  },
  {
    label: 'Cores Primitivas - Teal',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-teal-')
    ),
  },
  {
    label: 'Cores Primitivas - Blue',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-blue-')
    ),
  },
  {
    label: 'Cores Primitivas - Purple',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-purple-')
    ),
  },
  {
    label: 'Cores Primitivas - Pink',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-pink-')
    ),
  },
  {
    label: 'Cores Primitivas - Cyan',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-cyan-')
    ),
  },
  {
    label: 'Cores Semânticas - Foreground',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-fg-')),
  },
  {
    label: 'Cores Semânticas - Background',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-bg-')),
  },
  {
    label: 'Espaçamento',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-space-')
    ),
  },
  {
    label: 'Tipografia - Fonts',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-font-')
    ),
  },
  {
    label: 'Tipografia - Text Variants',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-text-')
    ),
  },
  {
    label: 'Bordas',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-border-')
    ),
  },
  {
    label: 'Border Radius',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-radius-')
    ),
  },
  {
    label: 'Shadows & Focus Rings',
    tokens: Object.keys(SUNRISE_TOKENS).filter(
      (k) => k.startsWith('--sl-shadow-') || k.startsWith('--sl-focus-ring-')
    ),
  },
  {
    label: 'Z-Index',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-z-')),
  },
]

export default {
  title: 'Theme Builder',
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
}

// Função helper para extrair valor de cor hexadecimal
function extractHexColor(colorValue: string): string {
  if (colorValue.startsWith('#')) {
    return colorValue
  }
  if (colorValue.startsWith('rgb')) {
    // Converter RGB para hex se necessário
    return colorValue
  }
  if (colorValue.startsWith('var(')) {
    // Para variáveis CSS, retornar padrão
    return '#000000'
  }
  if (colorValue.startsWith('color-mix')) {
    return '#000000'
  }
  return colorValue
}

export function ThemeBuilder() {
  const [tokens, setTokens] = useState<Record<string, string>>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return { ...SUNRISE_TOKENS }
        }
      }
    }
    return { ...SUNRISE_TOKENS }
  })

  const [selectedComponents, setSelectedComponents] = useState<Set<string>>(
    () => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY_COMPONENTS)
        if (stored) {
          try {
            return new Set(JSON.parse(stored))
          } catch {
            return new Set(AVAILABLE_COMPONENTS)
          }
        }
      }
      return new Set(AVAILABLE_COMPONENTS)
    }
  )

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )
  const [showComponentSelector, setShowComponentSelector] = useState(false)
  const styleRef = useRef<HTMLStyleElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (typeof document === 'undefined') return

    if (!styleRef.current) {
      const style = document.createElement('style')
      style.id = 'theme-builder-custom-tokens'
      document.head.appendChild(style)
      styleRef.current = style
    }

    const css = `#theme-builder-preview {\n${Object.entries(tokens)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`
    styleRef.current.textContent = css

    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  }, [tokens])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        STORAGE_KEY_COMPONENTS,
        JSON.stringify(Array.from(selectedComponents))
      )
    }
  }, [selectedComponents])

  function handleTokenChange(tokenKey: string, value: string) {
    setTokens((prev) => ({ ...prev, [tokenKey]: value }))
  }

  function handleReset() {
    setTokens({ ...SUNRISE_TOKENS })
    localStorage.removeItem(STORAGE_KEY)
  }

  function handleExport() {
    const dataStr = JSON.stringify(tokens, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'shoreline-theme.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  function handleImport(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        setTokens(imported)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(imported))
      } catch (error) {
        alert('Erro ao importar arquivo. Verifique se é um JSON válido.')
      }
    }
    reader.readAsText(file)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  function toggleCategory(categoryLabel: string) {
    setExpandedCategories((prev) => {
      const next = new Set(prev)
      if (next.has(categoryLabel)) {
        next.delete(categoryLabel)
      } else {
        next.add(categoryLabel)
      }
      return next
    })
  }

  function toggleComponent(component: string) {
    setSelectedComponents((prev) => {
      const next = new Set(prev)
      if (next.has(component)) {
        next.delete(component)
      } else {
        next.add(component)
      }
      return next
    })
  }

  function selectAllComponents() {
    setSelectedComponents(new Set(AVAILABLE_COMPONENTS))
  }

  function deselectAllComponents() {
    setSelectedComponents(new Set())
  }

  // Filtrar grupos baseado na busca
  const filteredGroups = TOKEN_GROUPS.map((group) => ({
    ...group,
    tokens: searchQuery
      ? group.tokens.filter((token) =>
          token.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : group.tokens,
  })).filter((group) => group.tokens.length > 0)

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Sidebar */}
      <div
        style={{
          width: '420px',
          borderRight: '1px solid var(--sl-color-gray-3)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 20px',
            borderBottom: '1px solid var(--sl-color-gray-2)',
          }}
        >
          <Heading variant="display2" style={{ marginBottom: '8px' }}>
            Theme Builder
          </Heading>
          <Text variant="body" style={{ color: 'var(--sl-color-gray-9)' }}>
            Customize Shoreline tokens in real-time
          </Text>
        </div>

        {/* Toolbar */}
        <div
          style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--sl-color-gray-2)',
          }}
        >
          <Stack>
            <Search
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tokens..."
            />

            {/* Action Buttons */}
            <Flex direction="row" style={{ gap: '8px', flexWrap: 'wrap' }}>
              <Tooltip label="Reset to default theme">
                <Button
                  variant="tertiary"
                  onClick={handleReset}
                  style={{ flex: 1 }}
                  size="normal"
                >
                  <IconArrowsClockwise />
                  Reset
                </Button>
              </Tooltip>
              <Tooltip label="Export theme as JSON">
                <Button
                  variant="tertiary"
                  onClick={handleExport}
                  style={{ flex: 1 }}
                  size="normal"
                >
                  <IconArrowLineDown />
                  Export
                </Button>
              </Tooltip>
              <Tooltip label="Import theme from JSON">
                <Button
                  variant="tertiary"
                  onClick={() => fileInputRef.current?.click()}
                  style={{ flex: 1 }}
                  size="normal"
                >
                  <IconArrowLineUp />
                  Import
                </Button>
              </Tooltip>
            </Flex>

            {/* Component Selector Button */}
            <Button
              variant="secondary"
              onClick={() => setShowComponentSelector(!showComponentSelector)}
              style={{ width: '100%' }}
            >
              <IconGearSix />
              {selectedComponents.size === AVAILABLE_COMPONENTS.length
                ? 'All Components'
                : `${selectedComponents.size} Component${selectedComponents.size !== 1 ? 's' : ''}`}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </Stack>
        </div>

        {/* Component Selector Panel */}
        {showComponentSelector && (
          <div
            style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--sl-color-gray-2)',
              backgroundColor: 'var(--sl-color-gray-1)',
              maxHeight: '40vh',
              overflowY: 'auto',
            }}
          >
            <Stack>
              <Flex direction="row" justify="space-between" align="center">
                <Text variant="emphasis">Select Components</Text>
                <Flex direction="row" style={{ gap: '8px' }}>
                  <Button
                    variant="tertiary"
                    onClick={selectAllComponents}
                    size="normal"
                  >
                    All
                  </Button>
                  <Button
                    variant="tertiary"
                    onClick={deselectAllComponents}
                    size="normal"
                  >
                    None
                  </Button>
                </Flex>
              </Flex>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '8px',
                }}
              >
                {AVAILABLE_COMPONENTS.map((component) => (
                  <Checkbox
                    key={component}
                    checked={selectedComponents.has(component)}
                    onChange={() => toggleComponent(component)}
                  >
                    {component}
                  </Checkbox>
                ))}
              </div>
            </Stack>
          </div>
        )}

        {/* Token List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
          <Stack style={{ gap: '12px', width: '100%' }}>
            {filteredGroups.map((group) => {
              const isExpanded = expandedCategories.has(group.label)
              return (
                <div key={group.label} style={{ width: '100%' }}>
                  <button
                    onClick={() => toggleCategory(group.label)}
                    style={{
                      width: '100%',
                      padding: '12px',
                      background: 'var(--sl-color-gray-1)',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'background 0.2s',
                      boxSizing: 'border-box',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        'var(--sl-color-gray-2)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        'var(--sl-color-gray-1)'
                    }}
                  >
                    <span>{group.label}</span>
                    <IconCaretDown
                      style={{
                        transform: isExpanded
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.2s',
                        fontSize: '16px',
                        color: 'var(--sl-color-gray-10)',
                        flexShrink: 0,
                      }}
                    />
                  </button>
                  {isExpanded && (
                    <div
                      style={{
                        marginTop: '12px',
                        maxHeight: '300px',
                        overflowY: 'auto',
                      }}
                    >
                      <Stack style={{ gap: '12px' }}>
                        {group.tokens.map((tokenKey) => {
                          const value =
                            tokens[tokenKey] || SUNRISE_TOKENS[tokenKey] || ''
                          const isColorToken =
                            tokenKey.includes('color') ||
                            tokenKey.startsWith('--sl-fg-') ||
                            tokenKey.startsWith('--sl-bg-')

                          const hexColor = extractHexColor(value)

                          return (
                            <div
                              key={tokenKey}
                              style={{
                                padding: '12px',
                                backgroundColor: '#ffffff',
                                borderRadius: '8px',
                                border: '1px solid var(--sl-color-gray-2)',
                              }}
                            >
                              <Label
                                style={{
                                  fontSize: '11px',
                                  marginBottom: '6px',
                                  display: 'block',
                                  color: 'var(--sl-color-gray-10)',
                                  fontFamily: 'monospace',
                                }}
                              >
                                {tokenKey.replace('--sl-', '')}
                              </Label>
                              {isColorToken &&
                              !value.startsWith('var(') &&
                              !value.startsWith('color-mix') ? (
                                <Flex
                                  direction="row"
                                  style={{ gap: '8px', alignItems: 'center' }}
                                >
                                  <input
                                    type="color"
                                    value={hexColor}
                                    onChange={(e) =>
                                      handleTokenChange(
                                        tokenKey,
                                        e.target.value
                                      )
                                    }
                                    style={{
                                      width: '48px',
                                      height: '36px',
                                      border:
                                        '1px solid var(--sl-color-gray-3)',
                                      borderRadius: '6px',
                                      cursor: 'pointer',
                                      padding: '2px',
                                      backgroundColor: '#ffffff',
                                    }}
                                  />
                                  <Input
                                    value={value}
                                    onChange={(val) =>
                                      handleTokenChange(tokenKey, val)
                                    }
                                    style={{ flex: 1 }}
                                  />
                                </Flex>
                              ) : (
                                <Input
                                  value={value}
                                  onChange={(val) =>
                                    handleTokenChange(tokenKey, val)
                                  }
                                />
                              )}
                            </div>
                          )
                        })}
                      </Stack>
                    </div>
                  )}
                </div>
              )
            })}
          </Stack>
        </div>
      </div>

      {/* Preview */}
      <div
        id="theme-builder-preview"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '48px',
          backgroundColor: '#fafafa',
        }}
      >
        {selectedComponents.size === 0 ? (
          <EmptyState size="large">
            <EmptyStateIllustration>
              <IconGearSix style={{ fontSize: '64px' }} />
            </EmptyStateIllustration>
            <Heading variant="display2">No Components Selected</Heading>
            <Text>Select components to preview theme changes</Text>
            <EmptyStateActions>
              <Button
                variant="primary"
                onClick={() => setShowComponentSelector(true)}
              >
                Select Components
              </Button>
            </EmptyStateActions>
          </EmptyState>
        ) : (
          <Stack style={{ gap: '48px', width: '100%' }}>
            {Array.from(selectedComponents)
              .sort()
              .map((componentName) => {
                const componentData = COMPONENT_EXAMPLES[componentName]
                if (!componentData) return null

                // Verificar se é um array de exemplos ou um único componente
                if (Array.isArray(componentData)) {
                  return (
                    <div key={componentName} style={{ width: '100%' }}>
                      <Heading
                        variant="display2"
                        style={{ marginBottom: '24px' }}
                      >
                        {componentName}
                      </Heading>
                      <Stack style={{ gap: '32px', width: '100%' }}>
                        {componentData.map(({ label, Component }, index) => (
                          <div key={label} style={{ width: '100%' }}>
                            <Text
                              variant="emphasis"
                              style={{
                                marginBottom: '12px',
                                display: 'block',
                              }}
                            >
                              {label}
                            </Text>
                            <div style={{ width: '100%' }}>
                              <Component />
                            </div>
                            {index < componentData.length - 1 && (
                              <Divider style={{ marginTop: '24px' }} />
                            )}
                          </div>
                        ))}
                      </Stack>
                      <Divider style={{ marginTop: '48px' }} />
                    </div>
                  )
                }

                // Renderizar componente único
                const Component = componentData
                return (
                  <div key={componentName} style={{ width: '100%' }}>
                    <Heading
                      variant="display2"
                      style={{ marginBottom: '24px' }}
                    >
                      {componentName}
                    </Heading>
                    <div style={{ width: '100%' }}>
                      <Component />
                    </div>
                    <Divider style={{ marginTop: '48px' }} />
                  </div>
                )
              })}
          </Stack>
        )}
      </div>
    </div>
  )
}
