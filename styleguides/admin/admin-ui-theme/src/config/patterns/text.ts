const text = {
  small: {
    lineHeight: 'small',
    fontVariationSettings: 'regular',
    fontSize: 0,
  },
  body: {
    lineHeight: 'body',
    fontVariationSettings: 'regular',
    fontSize: 1,
  },
  highlight: {
    lineHeight: 'highlight',
    fontVariationSettings: 'regular',
    fontSize: 1,
  },
  action: {
    lineHeight: 'action',
    fontVariationSettings: 'regular',
    fontSize: 1,
    textTransform: 'uppercase',
  },
  subtitle: {
    lineHeight: 'subtitle',
    fontVariationSettings: 'regular',
    fontSize: 2,
  },
  headline: {
    lineHeight: 'headline',
    fontVariationSettings: 'regular',
    fontSize: 4,
  },
}

export { text }

export type TextPattern = {
  /**
   * @description Sets a text style pattern, customizing the following typography properties.
   * - lineHeight
   * - fontSize
   * - fontVariationSettings
   * @example
   * ```jsx
   * <Component text="headline"/>
   * ```
   * @default headline
   * @see ...text-pattern-documentation
   */
  text?: keyof typeof text
}
