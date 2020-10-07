import React, { PropsWithChildren, useState, Fragment } from 'react'
import { Box, Text } from 'theme-ui'

import { IconGlobe, IconCaret } from '../../icons'

export const LocaleSwitcher = (
  props: PropsWithChildren<LocaleSwitcherProps>
) => {
  const { children, options, onChange, locale } = props
  const [open, setOpen] = useState<boolean>(false)

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

  return (
    <Fragment>
      <Box variant="localeSwitcher" onClick={() => setOpen((prev) => !prev)}>
        <IconGlobe size={24} />
        <Text variant="localeSwitcher.label">{getLocaleLabel()}</Text>
        <IconCaret direction="down" size={30} />
      </Box>
      {open && (
        <Fragment>
          <Box
            variant="localeSwitcher.overlay"
            role="presentation"
            onClick={() => setOpen(false)}
          />
          <Box variant="localeSwitcher.optionContainerLarge">
            {options.map((option) => {
              const active = option.value === locale
              const variant = 'localeSwitcher.option'

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
