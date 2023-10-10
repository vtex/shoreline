type SematicFreeElements = 'div' | 'span'

type SemanticElements =
  | 'article'
  | 'aside'
  | 'figure'
  | 'footer'
  | 'header'
  | 'main'
  | 'nav'
  | 'section'

export type ContentContainerAs = SematicFreeElements | SemanticElements
