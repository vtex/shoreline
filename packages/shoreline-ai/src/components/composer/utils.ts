import {
  Children,
  Fragment,
  type ReactNode,
  cloneElement,
  isValidElement,
} from 'react'

export {
  formatFileSize,
  isImageAttachmentType,
  isAttachmentLoading,
  isAttachmentError,
} from '../../utils/attachment-utils'

/**
 * Flattens `Fragment` wrappers so the footer can tell its children apart.
 * Nested keys are prefixed with their Fragment's key, so they stay unique.
 * Other wrapper components are left as they are.
 */
export function flattenFragments(
  children: ReactNode,
  keyPrefix = ''
): ReactNode[] {
  return Children.toArray(children).flatMap((child) => {
    if (!isValidElement<{ children?: ReactNode }>(child)) return [child]

    if (child.type === Fragment) {
      return flattenFragments(child.props.children, `${keyPrefix}${child.key}/`)
    }

    return [cloneElement(child, { key: `${keyPrefix}${child.key}` })]
  })
}
