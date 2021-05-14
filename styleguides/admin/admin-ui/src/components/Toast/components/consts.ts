import { StyleProp } from '@vtex/admin-core'

export const styles: StyleProp = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  minWidth: '16.125rem',
  width: 'auto',
  minHeight: '4.5rem',
  height: 'auto',
  maxHeight: '4.5rem',
  borderRadius: '0.25rem',
  padding: '1rem',
  boxShadow: 'subtle',
  backgroundColor: 'white',
  border: 'default',
}

// Important! Although these hexes below
// are "hardcoded" and don't correspond to
// any color defined on the Design System
// level, they were defined on the component
// level and share the same styles with the
// Alert component. We're actively discussing
// how we can include these colors on the Design
// System level.

export const errorStyles: StyleProp = {
  backgroundColor: '#FFF8F8',
  borderColor: '#EDB6B6',
}

export const warningStyles: StyleProp = {
  backgroundColor: '#FFF9EE',
  borderColor: '#E5C38E',
}

export const successStyles: StyleProp = {
  backgroundColor: '#F0F8F5',
  borderColor: '#8FC2B1',
}
