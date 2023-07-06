export type Foundation =
  | 'bg'
  | 'fg'
  | 'color'
  | 'border'
  | 'radii'
  | 'bp'
  | 'shadow'
  | 'z'
  | 'space'
  | 'ff'
  | 'fs'
  | 'fw'
  | 'lh'
  | 'ls'

export type FoundationDictionary = Record<string, Foundation>

export type Mixin = (value: string | number) => Record<string, string | number>

export type MixinDictionary = Record<string, Mixin>

export interface CsxObject {
  [key: string]: any
}
