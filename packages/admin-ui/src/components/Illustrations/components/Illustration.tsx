import type { ComponentPropsWithoutRef } from 'react'
import React from 'react'

export function Illustration(props: IllustrationProps) {
  return <svg fill="none" xmlns="http://www.w3.org/2000/svg" {...props} />
}

export interface IllustrationProps extends ComponentPropsWithoutRef<'svg'> {
  width?: number | string
  height?: number | string
}
