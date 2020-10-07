import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Text } from 'theme-ui'

import { IconCaret } from '../../icons'

export const LocaleSwitcher = (
  props: PropsWithChildren<LocaleSwitcherProps>
) => {
  const { children, options, onChange, locale } = props
  const [open, setOpen] = useState(false)

  const onChangeLocale = (option: LocaleOption) => {
    const nextLocaleValue = option.value

    onChange(nextLocaleValue)
  }

  const getLocaleLabel = () => {
    const currentLocaleOption = options.find(
      (option) => option.value === locale
    )

    return currentLocaleOption?.label ?? ''
  }

  const handleOpen = (value: boolean) => setOpen(value)

  return (
    <Fragment>
      <Box
        variant="localeSwitcher.large"
        onMouseEnter={() => handleOpen(true)}
        onMouseLeave={() => handleOpen(false)}
      >
        <Text variant="localeSwitcher.large.label">{getLocaleLabel()}</Text>
        <IconCaret
          sx={{ position: 'absolute', right: 3 }}
          direction="down"
          size={30}
        />
        {open && (
          <Box variant="localeSwitcher.large.optionContainer">
            {options.map((option) => {
              const active = option.value === locale
              const variant = 'localeSwitcher.large.option'

              return (
                <Box
                  key={option.label}
                  variant={`${variant}${active ? '.active' : ''}`}
                  role="presentation"
                  onClick={() => {
                    onChangeLocale(option)
                    setOpen(false)
                  }}
                >
                  {option.label}
                </Box>
              )
            })}
          </Box>
        )}
      </Box>
      <Box variant="localeSwitcher.mobile">ab</Box>
      {open && (
        <Fragment>
          <Box
            variant="localeSwitcher.overlay"
            role="presentation"
            onClick={() => setOpen(false)}
          />
        </Fragment>
      )}
    </Fragment>
  )
}

export interface LocaleOption {
  /**
   * Text displayed on localization option label, i.e. "EN".
   */
  label: string
  /**
   * The localization value, i.e. "en".
   */
  value: string
}

export interface LocaleSwitcherProps {
  /**
   * Initial localization value.
   */
  locale: string
  /**
   * Options for localization.
   */
  options: LocaleOption[]
  /**
   * Function triggered when user changes the locale.
   */
  onChange: (locale: string) => void
}
