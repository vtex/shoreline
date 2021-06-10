import { ElementType, ComponentProps } from 'react'

export type WithAs<E extends ElementType = ElementType> = {
  as?: E
}

export type PolymorphicProps<E extends ElementType, P> = P &
  WithAs<E> &
  Omit<ComponentProps<E>, keyof WithAs>
