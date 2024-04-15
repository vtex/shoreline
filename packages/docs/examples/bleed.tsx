import React from 'react'
import { Bleed, Button, IconCaretLeft } from '@vtex/shoreline'
import { DecorativeBox } from '../components/decorative-box'

export default function Example() {
  return (
    <DecorativeBox color="blue">
      <Bleed top="$space-2" bottom="$space-2" start="$space-2">
        <Button variant="tertiary">
          <IconCaretLeft /> Action
        </Button>
      </Bleed>
    </DecorativeBox>
  )
}
