/** @jsx jsx */
import { Box, Text, Flex, jsx } from 'theme-ui'
import { Disclosure, DisclosureContent, useDisclosureState } from 'reakit'
import { Fragment } from 'react'

import { IconCaret, IconGlobe } from '../../icons'

export const LocaleSwitcher = ({
  options,
  onChange,
  locale,
}: LocaleSwitcherProps) => {
  const disclosure = useDisclosureState({ visible: false })

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

  const Option = ({
    screen,
    option,
  }: {
    screen: 'mobile' | 'large'
    option: LocaleOption
  }) => {
    const active = option.value === locale
    const variant = `localeSwitcher.${screen}.option`

    return (
      <Box
        variant={`${variant}${active ? '.active' : ''}`}
        role="presentation"
        onClick={() => {
          onChangeLocale(option)
          disclosure.hide()
        }}
      >
        {option.label}
      </Box>
    )
  }

  return (
    <Fragment>
      <Disclosure sx={{ variant: 'localeSwitcher.large' }} {...disclosure}>
        <IconGlobe sx={{ ml: 5 }} size={22} />
        <Text variant="localeSwitcher.large.label">{getLocaleLabel()}</Text>
        <IconCaret
          sx={{ position: 'absolute', right: 4 }}
          direction="down"
          size={30}
        />
      </Disclosure>
      <Disclosure
        {...disclosure}
        sx={{
          variant: `localeSwitcher.mobile${disclosure.visible ? '.open' : ''}`,
        }}
      >
        <Flex sx={{ alignItems: 'center' }}>
          <IconGlobe size={22} />
          <Text variant="localeSwitcher.mobile.label">{getLocaleLabel()}</Text>
        </Flex>
        <IconCaret size={32} direction={disclosure.visible ? 'down' : 'up'} />
      </Disclosure>
      <DisclosureContent
        {...disclosure}
        sx={{
          variant: 'localeSwitcher.large.optionContainer',
        }}
      >
        {options.map((option) => (
          <Option key={option.label} option={option} screen="large" />
        ))}
      </DisclosureContent>
      <DisclosureContent
        {...disclosure}
        onClick={() => disclosure.hide()}
        sx={{
          variant: 'localeSwitcher.overlay',
        }}
        role="presentation"
      />
      <DisclosureContent
        {...disclosure}
        sx={{ variant: 'localeSwitcher.mobile.optionContainer' }}
      >
        {options.map((option) => (
          <Option key={option.label} option={option} screen="mobile" />
        ))}
      </DisclosureContent>
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
