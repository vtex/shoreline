import React from 'react'
import type { Meta } from '@storybook/react'
import { createAtoms, createClsx } from '../runtime'
import { styles } from '../adminUI'
import createEmotion from '@emotion/css/create-instance'

export default {
  title: 'admin-ui-core/core',
} as Meta

const emotion = createEmotion({
  key: 'admin-ui-core',
})

const clsx = createClsx(emotion)
const atoms = createAtoms(styles, clsx)

export function FrameworkdAgnostic() {
  return (
    <div
      className={atoms({
        bg: 'muted',
        color: 'base',
        borderColor: 'container',
        borderWidth: 1,
        borderStyle: 'solid',
        padding: 1,
        marginY: 2,
        size: 150,
        borderRadius: 'default',
      })}
    >
      With csx
    </div>
  )
}
