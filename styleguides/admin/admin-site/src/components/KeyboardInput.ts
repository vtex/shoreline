import { css, cx } from 'emotion'
import { useBox, BoxHTMLProps, BoxOptions } from 'reakit'
import { createHook, createComponent } from 'reakit-system'
import { useColor, darken } from '@vtex/admin-ui'

export type KeyboardInputOptions = BoxOptions
export type KeyboardInputHTMLProps = BoxHTMLProps
export type KeyboardInputProps = KeyboardInputOptions & KeyboardInputHTMLProps

export const useKeyboardInput = createHook<
  KeyboardInputOptions,
  KeyboardInputHTMLProps
>({
  name: 'KeyboardInput',
  compose: useBox,

  useProps(_, htmlProps) {
    const color = useColor('background')
    const background = darken(0.08, color)
    const borderColor = darken(0.15, color)

    const keyboardInput = css`
      border-radius: 0.25em;
      background-color: ${background};
      padding: 0.3em 0.5em 0.25em;
      border: 1px solid ${borderColor};
      border-width: 1px 1px 2px 1px;
      font-size: 0.875em;
    `

    return {
      ...htmlProps,
      className: cx(keyboardInput, htmlProps.className),
    }
  },
})

const KeyboardInput = createComponent({
  as: 'kbd',
  useHook: useKeyboardInput,
})

export default KeyboardInput
