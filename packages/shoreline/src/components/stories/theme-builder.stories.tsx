import { useState, useEffect, useRef, useMemo } from 'react'
import '@vtex/shoreline/css'
import {
  Button,
  Stack,
  Flex,
  Grid,
  Heading,
  Text,
  Input,
  Select,
  SelectItem,
  SelectPopover,
  SelectProvider,
  SelectTrigger,
  Checkbox,
  Radio,
  RadioGroup,
  Textarea,
  Search,
  Alert,
  Tag,
  Divider,
  Link,
  EmptyState,
  EmptyStateActions,
  EmptyStateIllustration,
  Skeleton,
  Spinner,
  Label,
  FieldDescription,
  IconArrowsClockwise,
  IconArrowLineDown,
  IconArrowLineUp,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Tab,
  TabList,
  TabPanel,
  TabProvider,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Page,
  PageContent,
  PageHeader,
  PageHeading,
  Popover,
  PopoverProvider,
  PopoverTrigger,
  Filter,
  FilterItem,
  IconGearSix,
  IconHeart,
  IconTrash,
  IconPencil,
  IconInfo,
  Bleed,
  Center,
  ContextualHelp,
  Container,
  Content,
  Clickable,
  CheckboxGroup,
  DatePicker,
  DateRangePicker,
  DateField,
  TimeInput,
  parseDate,
  toast,
  ToastStack,
  Modal,
  ModalHeader,
  ModalHeading,
  ModalContent,
  ModalFooter,
  ModalDismiss,
  DrawerProvider,
  DrawerPopover,
  DrawerHeader,
  DrawerHeading,
  DrawerContent,
  DrawerFooter,
  DrawerDismiss,
  ComboboxProvider,
  ComboboxInput,
  ComboboxPopover,
  ComboboxItem,
  Field,
} from '../../index'

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

type TokenCategory = 'colors' | 'spacing' | 'typography' | 'borders' | 'effects'

interface TokenGroup {
  category: TokenCategory
  label: string
  tokens: string[]
}

// Organizar tokens por categoria
const TOKEN_GROUPS: TokenGroup[] = [
  {
    category: 'colors',
    label: 'Cores Primitivas - Gray',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-gray-')
    ),
  },
  {
    category: 'colors',
    label: 'Cores Primitivas - Red',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-red-')
    ),
  },
  {
    category: 'colors',
    label: 'Cores Primitivas - Blue',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-color-blue-')
    ),
  },
  {
    category: 'colors',
    label: 'Cores Semânticas - Foreground',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-fg-')),
  },
  {
    category: 'colors',
    label: 'Cores Semânticas - Background',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-bg-')),
  },
  {
    category: 'spacing',
    label: 'Espaçamento',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-space-')
    ),
  },
  {
    category: 'typography',
    label: 'Tipografia - Fonts',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-font-')
    ),
  },
  {
    category: 'typography',
    label: 'Tipografia - Text Variants',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-text-')
    ),
  },
  {
    category: 'borders',
    label: 'Bordas',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-border-')
    ),
  },
  {
    category: 'borders',
    label: 'Border Radius',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) =>
      k.startsWith('--sl-radius-')
    ),
  },
  {
    category: 'effects',
    label: 'Shadows & Focus Rings',
    tokens: Object.keys(SUNRISE_TOKENS).filter(
      (k) => k.startsWith('--sl-shadow-') || k.startsWith('--sl-focus-ring-')
    ),
  },
  {
    category: 'effects',
    label: 'Z-Index',
    tokens: Object.keys(SUNRISE_TOKENS).filter((k) => k.startsWith('--sl-z-')),
  },
]

// Função para extrair valor de cor de uma string CSS
function extractColorValue(value: string): string {
  if (value.startsWith('#')) return value
  if (value.startsWith('rgb') || value.startsWith('rgba')) return value
  if (value.startsWith('var(')) {
    // Para variáveis, tentar resolver ou retornar como está
    return value
  }
  return value
}

// Função para verificar se é uma cor
function isColorToken(token: string): boolean {
  return (
    token.includes('color') || token.includes('fg-') || token.includes('bg-')
  )
}

export default {
  title: 'Theme Builder',
  parameters: {
    layout: 'fullscreen',
    chromatic: { disableSnapshot: true },
  },
}

export function ThemeBuilder() {
  const [tokens, setTokens] = useState<Record<string, string>>(() => {
    // Carregar do localStorage ou usar padrão
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

  const [searchQuery, setSearchQuery] = useState('')
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(['colors'])
  )
  const styleRef = useRef<HTMLStyleElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Aplicar tokens ao documento
  useEffect(() => {
    if (typeof document === 'undefined') return

    if (!styleRef.current) {
      const style = document.createElement('style')
      style.id = 'theme-builder-custom-tokens'
      document.head.appendChild(style)
      styleRef.current = style
    }

    const css = `:root {\n${Object.entries(tokens)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')}\n}`
    styleRef.current.textContent = css

    // Salvar no localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tokens))
  }, [tokens])

  function handleTokenChange(tokenKey: string, value: string) {
    setTokens((prev) => ({
      ...prev,
      [tokenKey]: value,
    }))
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

  // Filtrar grupos baseado na busca
  const filteredGroups = useMemo(() => {
    if (!searchQuery) return TOKEN_GROUPS

    const query = searchQuery.toLowerCase()
    return TOKEN_GROUPS.map((group) => ({
      ...group,
      tokens: group.tokens.filter((token) =>
        token.toLowerCase().includes(query)
      ),
    })).filter((group) => group.tokens.length > 0)
  }, [searchQuery])

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
      {/* Painel Esquerdo - Editor de Tokens */}
      <div
        style={{
          width: '400px',
          borderRight: '1px solid var(--sl-border-base)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          backgroundColor: 'var(--sl-bg-base)',
        }}
      >
        <div
          style={{
            padding: 'var(--sl-space-4)',
            borderBottom: '1px solid var(--sl-border-base)',
          }}
        >
          <Heading
            variant="display3"
            style={{ marginBottom: 'var(--sl-space-4)' }}
          >
            Theme Builder
          </Heading>
          <Stack>
            <Search
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tokens..."
            />
            <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
              <Button
                variant="secondary"
                onClick={handleReset}
                style={{ flex: 1 }}
              >
                <IconArrowsClockwise /> Reset
              </Button>
              <Button
                variant="secondary"
                onClick={handleExport}
                style={{ flex: 1 }}
              >
                <IconArrowLineDown /> Export
              </Button>
              <Button
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
                style={{ flex: 1 }}
              >
                <IconArrowLineUp /> Import
              </Button>
            </Flex>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleImport}
              style={{ display: 'none' }}
            />
          </Stack>
        </div>

        <div
          style={{ flex: 1, overflowY: 'auto', padding: 'var(--sl-space-4)' }}
        >
          <Stack>
            {filteredGroups.map((group) => {
              const isExpanded = expandedCategories.has(group.label)
              return (
                <div key={group.label}>
                  <button
                    onClick={() => toggleCategory(group.label)}
                    style={{
                      width: '100%',
                      padding: 'var(--sl-space-2)',
                      textAlign: 'left',
                      border: 'none',
                      background: 'var(--sl-bg-muted-plain)',
                      borderRadius: 'var(--sl-radius-2)',
                      cursor: 'pointer',
                      fontWeight: 'var(--sl-font-weight-medium)',
                      marginBottom: 'var(--sl-space-2)',
                    }}
                  >
                    {isExpanded ? '▼' : '▶'} {group.label}
                  </button>
                  {isExpanded && (
                    <Stack
                      style={{
                        marginLeft: 'var(--sl-space-4)',
                        marginBottom: 'var(--sl-space-4)',
                      }}
                    >
                      {group.tokens.map((tokenKey) => {
                        const value =
                          tokens[tokenKey] || SUNRISE_TOKENS[tokenKey] || ''
                        const isColor = isColorToken(tokenKey)

                        return (
                          <div
                            key={tokenKey}
                            style={{ marginBottom: 'var(--sl-space-3)' }}
                          >
                            <Label
                              style={{
                                fontSize: 'var(--sl-font-size-1)',
                                marginBottom: 'var(--sl-space-1)',
                              }}
                            >
                              {tokenKey.replace('--sl-', '')}
                            </Label>
                            {isColor &&
                            !value.startsWith('var(') &&
                            !value.startsWith('color-mix') ? (
                              <Flex
                                direction="row"
                                style={{ gap: 'var(--sl-space-2)' }}
                              >
                                <input
                                  type="color"
                                  value={extractColorValue(value)}
                                  onChange={(e) =>
                                    handleTokenChange(tokenKey, e.target.value)
                                  }
                                  style={{
                                    width: '50px',
                                    height: '32px',
                                    border: 'var(--sl-border-base)',
                                    borderRadius: 'var(--sl-radius-1)',
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
                                placeholder={SUNRISE_TOKENS[tokenKey]}
                              />
                            )}
                          </div>
                        )
                      })}
                    </Stack>
                  )}
                </div>
              )
            })}
          </Stack>
        </div>
      </div>

      {/* Painel Direito - Preview */}
      <div
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--sl-space-6)',
          backgroundColor: 'var(--sl-bg-base)',
        }}
      >
        <Stack fluid>
          {/* Typography */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Typography
            </Heading>
            <Stack>
              <Heading variant="display1">Display 1 Heading</Heading>
              <Heading variant="display2">Display 2 Heading</Heading>
              <Heading variant="display3">Display 3 Heading</Heading>
              <Heading variant="display4">Display 4 Heading</Heading>
              <Text variant="body">Body text</Text>
              <Text variant="emphasis">Emphasis text</Text>
              <Text variant="action">Action text</Text>
              <Text variant="caption1">Caption 1 text</Text>
              <Text variant="caption2">Caption 2 text</Text>
            </Stack>
          </div>

          <Divider />

          {/* Buttons */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Buttons
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="tertiary">Tertiary</Button>
                <Button variant="critical">Critical</Button>
                <Button variant="criticalTertiary">Critical Tertiary</Button>
              </Flex>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Button size="large" variant="primary">
                  Large Primary
                </Button>
                <Button size="large" variant="secondary">
                  Large Secondary
                </Button>
              </Flex>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Button variant="primary" loading>
                  Loading
                </Button>
                <Button variant="primary" disabled>
                  Disabled
                </Button>
              </Flex>
            </Stack>
          </div>

          <Divider />

          {/* Inputs */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Inputs
            </Heading>
            <Stack>
              <Input placeholder="Default input" />
              <Input
                prefix="R$"
                suffix=".00"
                placeholder="Input with prefix/suffix"
              />
              <Input error placeholder="Input with error" />
              <Input disabled placeholder="Disabled input" />
              <Textarea placeholder="Textarea" />
              <Search placeholder="Search..." />
              <div>
                <Label>Field with label</Label>
                <Input placeholder="Field input" />
                <FieldDescription>This is a description</FieldDescription>
              </div>
            </Stack>
          </div>

          <Divider />

          {/* Selects & Checkboxes */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Selects & Checkboxes
            </Heading>
            <Stack>
              <SelectProvider>
                <Select>
                  <SelectTrigger>Select an option</SelectTrigger>
                  <SelectPopover>
                    <SelectItem value="option1">Option 1</SelectItem>
                    <SelectItem value="option2">Option 2</SelectItem>
                    <SelectItem value="option3">Option 3</SelectItem>
                  </SelectPopover>
                </Select>
              </SelectProvider>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Checkbox>Checkbox 1</Checkbox>
                <Checkbox defaultChecked>Checkbox 2</Checkbox>
              </Flex>
              <RadioGroup label="Radio Group">
                <Radio value="option1">Radio 1</Radio>
                <Radio value="option2">Radio 2</Radio>
              </RadioGroup>
            </Stack>
          </div>

          <Divider />

          {/* Feedback */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Feedback
            </Heading>
            <Stack>
              <Alert variant="informational">Informational alert</Alert>
              <Alert variant="success">Success alert</Alert>
              <Alert variant="warning">Warning alert</Alert>
              <Alert variant="critical">Critical alert</Alert>
              <EmptyState size="medium">
                <EmptyStateIllustration>
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'var(--sl-bg-base-soft)',
                      borderRadius: 'var(--sl-radius-2)',
                    }}
                  />
                </EmptyStateIllustration>
                <Heading variant="display3">Empty State</Heading>
                <Text>This is an empty state example</Text>
                <EmptyStateActions>
                  <Button variant="primary">Action</Button>
                </EmptyStateActions>
              </EmptyState>
            </Stack>
          </div>

          <Divider />

          {/* Tags & Links */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Tags & Links
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Tag variant="primary" color="blue">
                  Tag Primary
                </Tag>
                <Tag variant="secondary" color="red">
                  Tag Secondary
                </Tag>
                <Tag variant="primary" color="green">
                  Tag Green
                </Tag>
              </Flex>
              <Link href="#">Link example</Link>
            </Stack>
          </div>

          <Divider />

          {/* Layout Components */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Layout
            </Heading>
            <Stack>
              <Grid
                style={{
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: 'var(--sl-space-4)',
                }}
              >
                <div
                  style={{
                    padding: 'var(--sl-space-4)',
                    backgroundColor: 'var(--sl-bg-base-soft)',
                    borderRadius: 'var(--sl-radius-2)',
                  }}
                >
                  Grid Item 1
                </div>
                <div
                  style={{
                    padding: 'var(--sl-space-4)',
                    backgroundColor: 'var(--sl-bg-base-soft)',
                    borderRadius: 'var(--sl-radius-2)',
                  }}
                >
                  Grid Item 2
                </div>
                <div
                  style={{
                    padding: 'var(--sl-space-4)',
                    backgroundColor: 'var(--sl-bg-base-soft)',
                    borderRadius: 'var(--sl-radius-2)',
                  }}
                >
                  Grid Item 3
                </div>
              </Grid>
            </Stack>
          </div>

          <Divider />

          {/* Loading States */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Loading States
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Spinner size={24} />
                <Spinner size={16} />
                <Spinner size={32} />
              </Flex>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Skeleton style={{ width: '200px', height: '20px' }} />
                <Skeleton
                  data-sl-skeleton-shape="circle"
                  style={{ width: '100px', height: '100px' }}
                />
              </Flex>
            </Stack>
          </div>

          <Divider />

          {/* Icon Buttons */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Icon Buttons
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <IconButton variant="primary" label="Settings">
                  <IconGearSix />
                </IconButton>
                <IconButton variant="secondary" label="Favorite">
                  <IconHeart />
                </IconButton>
                <IconButton variant="tertiary" label="Delete">
                  <IconTrash />
                </IconButton>
                <IconButton variant="critical" label="Edit">
                  <IconPencil />
                </IconButton>
              </Flex>
            </Stack>
          </div>

          <Divider />

          {/* Tooltips */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Tooltips
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Tooltip label="This is a tooltip">
                  <Button variant="secondary">Hover me</Button>
                </Tooltip>
                <Tooltip label="Information tooltip">
                  <IconButton variant="tertiary" label="Info">
                    <IconInfo />
                  </IconButton>
                </Tooltip>
              </Flex>
            </Stack>
          </div>

          <Divider />

          {/* Menu */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Menu
            </Heading>
            <Stack>
              <Menu label="Open">
                <MenuItem>Edit</MenuItem>
                <MenuItem>Duplicate</MenuItem>
                <MenuItem>Delete</MenuItem>
              </Menu>
            </Stack>
          </div>

          <Divider />

          {/* Tabs */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Tabs
            </Heading>
            <Stack>
              <TabProvider defaultSelectedId="tab1">
                <TabList>
                  <Tab id="tab1">Tab 1</Tab>
                  <Tab id="tab2">Tab 2</Tab>
                  <Tab id="tab3">Tab 3</Tab>
                </TabList>
                <TabPanel tabId="tab1">
                  <Text>Content for Tab 1</Text>
                </TabPanel>
                <TabPanel tabId="tab2">
                  <Text>Content for Tab 2</Text>
                </TabPanel>
                <TabPanel tabId="tab3">
                  <Text>Content for Tab 3</Text>
                </TabPanel>
              </TabProvider>
            </Stack>
          </div>

          <Divider />

          {/* Pagination */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Pagination
            </Heading>
            <Stack>
              <Pagination page={1} total={100} onPageChange={() => {}} />
            </Stack>
          </div>

          <Divider />

          {/* Table */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Table
            </Heading>
            <Stack>
              <Table
                columnWidths={[
                  'minmax(min-content, auto)',
                  'minmax(min-content, auto)',
                  'minmax(min-content, auto)',
                ]}
              >
                <TableHeader>
                  <TableRow>
                    <TableHeaderCell>Name</TableHeaderCell>
                    <TableHeaderCell>Email</TableHeaderCell>
                    <TableHeaderCell>Status</TableHeaderCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell>John Doe</TableCell>
                    <TableCell>john@example.com</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Jane Smith</TableCell>
                    <TableCell>jane@example.com</TableCell>
                    <TableCell>Inactive</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Bob Johnson</TableCell>
                    <TableCell>bob@example.com</TableCell>
                    <TableCell>Active</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </div>

          <Divider />

          {/* Page Component */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Page Component
            </Heading>
            <Page>
              <PageHeader>
                <PageHeading>Page Title</PageHeading>
              </PageHeader>
              <PageContent>
                <Text>This is page content using Page components.</Text>
              </PageContent>
            </Page>
          </div>

          <Divider />

          {/* Filter */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Filter
            </Heading>
            <Stack>
              <Filter label="Filter Options">
                <FilterItem value="option1">Option 1</FilterItem>
                <FilterItem value="option2">Option 2</FilterItem>
                <FilterItem value="option3">Option 3</FilterItem>
              </Filter>
            </Stack>
          </div>

          <Divider />

          {/* Popover */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Popover
            </Heading>
            <Stack>
              <PopoverProvider>
                <PopoverTrigger asChild>
                  <Button variant="secondary">Open Popover</Button>
                </PopoverTrigger>
                <Popover>
                  <Stack style={{ padding: 'var(--sl-space-4)' }}>
                    <Heading variant="display4">Popover Title</Heading>
                    <Text>This is popover content</Text>
                  </Stack>
                </Popover>
              </PopoverProvider>
            </Stack>
          </div>

          <Divider />

          {/* Layout Components - Bleed & Center */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Layout - Bleed & Center
            </Heading>
            <Stack>
              <Bleed>
                <div
                  style={{
                    padding: 'var(--sl-space-4)',
                    backgroundColor: 'var(--sl-bg-base-soft)',
                  }}
                >
                  <Text>Bleed component example</Text>
                </div>
              </Bleed>
              <Center
                style={{ height: '100px', border: 'var(--sl-border-base)' }}
              >
                <Text>Centered content</Text>
              </Center>
            </Stack>
          </div>

          <Divider />

          {/* Checkbox Group */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Checkbox Group
            </Heading>
            <Stack>
              <CheckboxGroup label="Select options">
                <Checkbox value="option1">Option 1</Checkbox>
                <Checkbox value="option2">Option 2</Checkbox>
                <Checkbox value="option3">Option 3</Checkbox>
              </CheckboxGroup>
            </Stack>
          </div>

          <Divider />

          {/* Clickable */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Clickable
            </Heading>
            <Stack>
              <Clickable asChild>
                <div
                  style={{
                    padding: 'var(--sl-space-4)',
                    border: 'var(--sl-border-base)',
                    borderRadius: 'var(--sl-radius-2)',
                  }}
                >
                  <Text>Click me - I'm a clickable div</Text>
                </div>
              </Clickable>
            </Stack>
          </div>

          <Divider />

          {/* Container & Content */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Container & Content
            </Heading>
            <Stack fluid>
              <Container>
                <Content narrow>
                  <Text>Content inside a Container component</Text>
                </Content>
              </Container>
            </Stack>
          </div>

          <Divider />

          {/* Date & Time Pickers */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Date & Time Pickers
            </Heading>
            <Stack>
              <div>
                <Label>Date Picker</Label>
                <DatePicker defaultValue={parseDate('2024-01-15')} />
              </div>
              <div>
                <Label>Date Range Picker</Label>
                <DateRangePicker />
              </div>
              <div>
                <Label>Date Field</Label>
                <DateField defaultValue={parseDate('2024-01-15')} />
              </div>
              <div>
                <Label>Time Input</Label>
                <TimeInput />
              </div>
            </Stack>
          </div>

          <Divider />

          {/* Contextual Help */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Contextual Help
            </Heading>
            <Stack>
              <Flex direction="row" style={{ gap: 'var(--sl-space-2)' }}>
                <Label>Field with help</Label>
                <ContextualHelp label="Help">
                  <Text>This is helpful information about the field.</Text>
                </ContextualHelp>
              </Flex>
              <Input placeholder="Input with contextual help" />
            </Stack>
          </div>

          <Divider />

          {/* Toast */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Toast
            </Heading>
            <Stack>
              <Button
                onClick={() => toast.informational('Informational toast')}
              >
                Informational
              </Button>
              <Button onClick={() => toast.success('Success toast')}>
                Success
              </Button>
              <Button onClick={() => toast.warning('Warning toast')}>
                Warning
              </Button>
              <Button onClick={() => toast.critical('Critical toast')}>
                Critical
              </Button>
            </Stack>
            <ToastStack />
          </div>

          <Divider />

          {/* Modal */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Modal
            </Heading>
            <ModalExample />
          </div>

          <Divider />

          {/* Drawer */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Drawer
            </Heading>
            <DrawerExample />
          </div>

          <Divider />

          {/* Tag Variants */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Tag Variants
            </Heading>
            <Stack>
              <Text variant="emphasis">Primary Tags</Text>
              <Flex gap="$space-2" align="center" direction="row" wrap="wrap">
                <Tag variant="primary" color="gray">
                  Gray
                </Tag>
                <Tag variant="primary" color="red">
                  Red
                </Tag>
                <Tag variant="primary" color="yellow">
                  Yellow
                </Tag>
                <Tag variant="primary" color="orange">
                  Orange
                </Tag>
                <Tag variant="primary" color="pink">
                  Pink
                </Tag>
                <Tag variant="primary" color="purple">
                  Purple
                </Tag>
                <Tag variant="primary" color="blue">
                  Blue
                </Tag>
                <Tag variant="primary" color="cyan">
                  Cyan
                </Tag>
                <Tag variant="primary" color="teal">
                  Teal
                </Tag>
                <Tag variant="primary" color="green">
                  Green
                </Tag>
              </Flex>
              <Text variant="emphasis">Secondary Tags</Text>
              <Flex gap="$space-2" align="center" direction="row" wrap="wrap">
                <Tag variant="secondary" color="gray">
                  Gray
                </Tag>
                <Tag variant="secondary" color="red">
                  Red
                </Tag>
                <Tag variant="secondary" color="yellow">
                  Yellow
                </Tag>
                <Tag variant="secondary" color="orange">
                  Orange
                </Tag>
                <Tag variant="secondary" color="pink">
                  Pink
                </Tag>
                <Tag variant="secondary" color="purple">
                  Purple
                </Tag>
                <Tag variant="secondary" color="blue">
                  Blue
                </Tag>
                <Tag variant="secondary" color="cyan">
                  Cyan
                </Tag>
                <Tag variant="secondary" color="teal">
                  Teal
                </Tag>
                <Tag variant="secondary" color="green">
                  Green
                </Tag>
              </Flex>
              <Text variant="emphasis">Sizes</Text>
              <Flex gap="$space-2" align="center" direction="row" wrap="wrap">
                <Tag size="normal">Normal</Tag>
                <Tag size="large">Large</Tag>
              </Flex>
            </Stack>
          </div>

          <Divider />

          {/* Combobox */}
          <div>
            <Heading
              variant="display3"
              style={{ marginBottom: 'var(--sl-space-4)' }}
            >
              Combobox
            </Heading>
            <ComboboxExample />
          </div>
        </Stack>
      </div>
    </div>
  )
}

function ModalExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <Modal open={open} onClose={() => setOpen(false)} size="medium">
        <ModalHeader>
          <ModalHeading>Modal Title</ModalHeading>
          <ModalDismiss />
        </ModalHeader>
        <ModalContent>
          <Text>This is the modal content. You can put any content here.</Text>
        </ModalContent>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => setOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

function DrawerExample() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Drawer</Button>
      <DrawerProvider open={open} onOpenChange={setOpen}>
        <DrawerPopover size="medium">
          <DrawerHeader>
            <DrawerHeading>Drawer Title</DrawerHeading>
            <DrawerDismiss />
          </DrawerHeader>
          <DrawerContent>
            <Text>This is the drawer content.</Text>
          </DrawerContent>
          <DrawerFooter>
            <Button onClick={() => setOpen(false)} size="large">
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => setOpen(false)}
              size="large"
            >
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerPopover>
      </DrawerProvider>
    </>
  )
}

function ComboboxExample() {
  const fruits = ['Apple', 'Banana', 'Cherry', 'Grape', 'Orange']

  return (
    <ComboboxProvider>
      <Field>
        <Label>Select a fruit</Label>
        <ComboboxInput placeholder="e.g., Apple" />
      </Field>
      <ComboboxPopover>
        {fruits.map((fruit) => (
          <ComboboxItem key={fruit} value={fruit}>
            {fruit}
          </ComboboxItem>
        ))}
      </ComboboxPopover>
    </ComboboxProvider>
  )
}
