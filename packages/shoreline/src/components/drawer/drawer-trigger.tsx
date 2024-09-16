import type { ComponentProps } from 'react'
import { Drawer as Vaul } from 'vaul'

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

export type DrawerTriggerOptions = ComponentProps<typeof Vaul.Trigger>

export type DrawerTriggerProps = DrawerTriggerOptions
