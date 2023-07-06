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

export interface CsxObject {
  [key: string]: any
}
