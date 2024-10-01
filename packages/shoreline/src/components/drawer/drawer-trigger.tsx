import type { ComponentProps } from 'react'
import { Drawer as Vaul } from 'vaul'
import type { ButtonOptions } from '../button'

/**
 * Drawer's Trigger
 * @example
 * <DrawerProvider>
 *  <DrawerTrigger asChild>
 *    <Button>Open</Button>
 *  </DrawerTrigger>
 * </DrawerProvider>
 */
export const DrawerTrigger: typeof Vaul.Trigger = Vaul.Trigger

export type DrawerTriggerOptions = Pick<ButtonOptions, 'asChild' | 'children'>

export type DrawerTriggerProps = DrawerTriggerOptions &
  ComponentProps<typeof Vaul.Trigger>
