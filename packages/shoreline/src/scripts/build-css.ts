import { bundle } from '@vtex/shoreline-css'

export function build() {
  const outdir = 'dist/themes/sunrise'
  const themeDir = 'src/themes/sunrise'

  // Bundle tokens (layered and unlayered)
  bundle({
    inputFile: `${themeDir}/tokens.css`,
    outdir,
    outputFile: 'tokens',
    layer: 'sl-tokens',
  })

  bundle({
    inputFile: `${themeDir}/tokens.css`,
    outdir,
    outputFile: 'tokens',
  })

  // Bundle reset (layered and unlayered)
  bundle({
    inputFile: `${themeDir}/reset.css`,
    outdir,
    outputFile: 'reset',
    layer: 'sl-reset',
  })

  bundle({
    inputFile: `${themeDir}/reset.css`,
    outdir,
    outputFile: 'reset',
  })

  // Bundle base (layered and unlayered)
  bundle({
    inputFile: `${themeDir}/base.css`,
    outdir,
    outputFile: 'base',
    layer: 'sl-base',
  })

  bundle({
    inputFile: `${themeDir}/base.css`,
    outdir,
    outputFile: 'base',
  })

  // Bundle components (layered and unlayered)
  bundle({
    inputFile: `${themeDir}/components/index.css`,
    outdir,
    outputFile: 'components',
    layer: 'sl-components',
  })

  bundle({
    inputFile: `${themeDir}/components/index.css`,
    outdir,
    outputFile: 'components',
  })

  // Bundle styles.css for backward compatibility (layered and unlayered)
  bundle({
    inputFile: `${themeDir}/styles.css`,
    outdir,
    includeLayersStatement: true,
  })

  bundle({
    inputFile: `${themeDir}/styles-unlayered.css`,
    outdir,
  })
}

build()
