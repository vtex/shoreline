import { onda } from '@vtex/admin-core'

/**
 * Component to create a user avatar from a passed label
 * It shows the first letter capitalized in the center
 * @example
 * ```jsx
 * <Avatar label="label" />
 * <Avatar label="label" palette="primary" />
 * <Avatar label="label" palette="danger" />
 * ```
 */
export const Avatar = onda(
  {
    as: 'div',
    useHook: (ownProps: AvatarOwnProps) => {
      return {
        children: ownProps.label.charAt(0),
      }
    },
    ownProps: ['label'],
  },
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 24,
    height: 24,
    padding: 2,
    borderRadius: 'circle',
    textTransform: 'uppercase',
    text: 'highlight',
    variants: {
      palette: {
        base: {
          bg: 'dark.primary',
          color: 'light.primary',
        },
        primary: {
          bg: 'blue',
          color: 'light.primary',
        },
        danger: {
          bg: 'red',
          color: 'light.primary',
        },
      },
    },
  }
)

Avatar.defaultProps = {
  palette: 'base',
}

export interface AvatarOwnProps {
  /**
   * String that will have its first letter capitalized
   */
  label: string
}
