import './styles.css'

import { EmptyState, EmptyStateActions, EmptyStateIllustration } from '../index'
import { Button } from '../../button'
import { Heading } from '../../heading'
import { Text } from '../../text'
import { IconWarningCircle } from '../../../icons'

export default {
  title: 'components/empty-state',
  // This is required because SVGs keep changing between builds
  parameters: {
    chromatic: { disableSnapshot: true },
  },
}

export function Show(props: { size: 'small' | 'medium' | 'large' }) {
  const { size } = props

  return (
    <div className="screen-container">
      <EmptyState size={size}>
        <EmptyStateIllustration>
          <IconWarningCircle />
        </EmptyStateIllustration>
        <Heading>Title goes here</Heading>
        <Text>
          Before you write the description here please visit the Shoreline
          documentation website to learn more about this componente and its
          usage.
        </Text>
        <EmptyStateActions>
          <Button>Label</Button>
          <Button variant="primary">Label</Button>
        </EmptyStateActions>
      </EmptyState>
    </div>
  )
}
