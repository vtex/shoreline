import { SystemPrimitive } from '@vtex/admin-primitives'

export type SystemComponent = SystemPrimitive
export type SystemComponentProps<T> = SystemPrimitive & OmitNotAllowedProps<T>
export type OmitNotAllowedProps<T> = Omit<T, 'className' | 'color' | 'style'>
