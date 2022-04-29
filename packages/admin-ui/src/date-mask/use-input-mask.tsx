import type { ComponentPropsWithRef } from 'react'
import { useRef } from 'react'
import type { DateObject } from '../calendar'

const propsByLocale: Record<string, I18nProps> = {
  'pt-BR': {
    placeholder: 'dd/MM/aaaa',
    order: {
      day: 0,
      month: 1,
      year: 2,
    },
    divider: '/',
  },
}

/**
 * @example
 * const { getInputProps } = useDateMask()
 * <input {...getInputProps()} />
 */
export function useDateMask() {
  const ref = useRef<HTMLInputElement>(null)

  const onKeyUp = () => {
    if (!ref.current) return

    let value = ref.current.value

    if (value.match(/^(\d{2}).(\d{2}).(\d{4})$/)) return

    value = value.replace(/\D/g, '')
    value = value.replace(/(\d{2})(\d)/, `$1${defaultProps.divider}$2`)
    value = value.replace(/(\d{2})(\d)/, `$1${defaultProps.divider}$2`)
    value = value.replace(/(\d{2})(\d{4})$/, `$1${defaultProps.divider}$2`)

    ref.current.value = value
  }

  function getInputProps(
    customProps?: InputProps
  ): ComponentPropsWithRef<'input'> {
    return {
      onKeyUp,
      maxLength: 10,
      ref,
      placeholder: defaultProps.placeholder,
      ...customProps,
    }
  }

  function getDateObject(): DateObject {
    if (!ref.current)
      return {
        day: 0,
        month: 0,
        year: 0,
      }

    const value = ref.current.value
    const parts = value.split('/')

    const {
      order: { day, month, year },
    } = defaultProps

    return {
      day: Number(parts?.[day] ?? 0) ?? 0,
      month: Number(parts?.[month] ?? 1) - 1,
      year: Number(parts?.[year] ?? 0),
    }
  }

  return {
    getInputProps,
    getDateObject,
  }
}

type DatePart = 'day' | 'month' | 'year'

interface I18nProps {
  placeholder: string
  order: Record<DatePart, number>
  divider: string
}

const defaultProps = propsByLocale['pt-BR']

type InputProps = ComponentPropsWithRef<'input'>
