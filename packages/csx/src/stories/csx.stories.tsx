import React from 'react'
import type { Meta } from '@storybook/react'
import { Stylesheet as RuntimeStylesheet } from 'runtime-stylesheet'
import { csx } from '../csx'
import { min } from '../math'

import type { CsxObject } from '../types'

export default {
  title: 'shoreline/csx',
} as Meta

/**
 * ssx converts csx in jsx style
 */
function ssx(object: CsxObject): React.CSSProperties {
  return csx(object) as React.CSSProperties
}

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
          ':root': {
            '@layer': {
              tokens: {
                '--sl-bg-primary': 'white',
                '--sl-fg-primary': 'black',
                '--sl-bg-action': '#225fa6',
                '--sl-bg-action-hover': '#0c5299',
                '--sl-bg-action-pressed': '#004788',
                '--sl-fg-action': 'white',

                '--sl-font-weight-regular': 400,
                '--sl-font-weight-medium': 500,
                '--sl-font-weight-semibold': 600,
                '--sl-font-weight-bold': 700,

                '--sl-line-height': 1.3,

                '--sl-font-family': `-apple-system, BlinkMacSystemFont, San Francisco,
                Segoe UI, Roboto, Helvetica Neue, sans-serif`,

                '--sl-text-display-1': `var(--sl-font-weight-medium) 2.5rem /
                var(--sl-line-height) var(--sl-font-family)`,
                '--sl-text-body': `var(--sl-font-weight-regular) 1rem /
      var(--sl-line-height) var(--sl-font-family)`,

                '--sl-width-full': '100%',
                '--sl-width-text-block': '75ch',
              },
            },
          },
          container: {
            height: '100vh',
            bg: '$bg-primary',
            padding: '1rem',
          },
          card: {
            container: 'card / inline-size',
            margin: 'auto',
            width: min('$width-full', '$width-text-block'),
            bg: '$bg-primary',
            fg: '$fg-primary',
            '& h1': {
              text: '$text-display-1',
            },
            '& p': {
              text: '$text-body',
            },
          },
          action: {
            bg: '$bg-action',
            fg: '$fg-action',
            radii: '8px',
            cursor: 'pointer',
            padding: '1rem',
            ':hover': {
              bg: '$bg-action-hover',
            },
            ':active': {
              bg: '$bg-action-pressed',
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
