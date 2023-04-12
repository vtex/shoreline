type IconSize = 'regular' | 'small'

declare module '@vtex/phosphor-icons' {
  export interface IconOptions {
    title?: string
    size?: IconSize
    className?: string
  }
}

export interface InputState {
  /** Whether the input is disabled. */
  isDisabled?: boolean
  /** Whether the input can be selected but not changed by the user. */
  isReadOnly?: boolean
}
