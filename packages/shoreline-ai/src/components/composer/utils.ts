import { Children, Fragment, type ReactNode, isValidElement } from 'react'

export {
  formatFileSize,
  isImageAttachmentType,
  isAttachmentLoading,
  isAttachmentError,
} from '../../utils/attachment-utils'

/**
 * Flattens `Fragment` wrappers so the footer can tell its children apart.
 * Other wrapper components are left as they are.
 */
export function flattenFragments(children: ReactNode): ReactNode[] {
  return Children.toArray(children).flatMap((child) =>
    isValidElement<{ children?: ReactNode }>(child) && child.type === Fragment
      ? flattenFragments(child.props.children)
      : [child]
  )
}
