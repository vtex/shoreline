import React from 'react'
import type { Meta } from '@storybook/react'
import { Stylesheet as RuntimeStylesheet } from 'runtime-stylesheet'
import { csx } from '../csx'
import { min } from '../math'
import '@vtex/shoreline-design-tokens/dist/css/style.css'

export default {
  title: 'shoreline/tokens-test',
} as Meta

export function Style() {
  return (
    <>
      <div className="container">
        <div className="card">
          <h1>Headline</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam feugiat
            pellentesque bibendum. Nullam eleifend turpis mollis justo
            sollicitudin, at gravida mi pharetra. Cras at orci elit. Nam
            sagittis euismod ornare. Nam facilisis neque quam, eget viverra nisi
            congue sed. Cras tellus lectus, condimentum at consectetur at,
            auctor nec lectus. Aliquam quis vulputate dui, id sollicitudin dui.
            Donec blandit nibh lobortis accumsan vulputate. Suspendisse sed
            tincidunt est. Mauris aliquet tortor pretium, viverra sem eget,
            faucibus enim. Sed scelerisque fermentum leo, eget finibus lectus.
          </p>
          <button className="action">Button</button>
        </div>
      </div>
      <RuntimeStylesheet
        css={csx({
          container: {
            height: '100vh',
            bg: '$bg-primary',
            padding: '1rem',
          },
          card: {
            container: 'card / inline-size',
            margin: 'auto',
            width: min('100%', '75ch'),
            bg: '$bg-primary',
            fg: '$fg-primary',
            '& h1': {
              text: '$text-display',
            },
            '& p': {
              text: '$text-body',
            },
          },
          action: {
            bg: '$bg-action-main-primary',
            fg: '$fg-action-main-primary',
            radii: '$radii-base',
            cursor: 'pointer',
            padding: '$space-2 $space-4',
            ':hover': {
              bg: '$bg-action-main-primary-hover',
            },
            ':active': {
              bg: '$bg-action-main-primary-pressed',
            },
            '@container': {
              '(max-width: 500px)': {
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              },
            },
          },
        })}
      />
    </>
  )
}
