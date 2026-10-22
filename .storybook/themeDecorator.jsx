import { useEffect } from 'react'
import { defaultTheme } from '../packages/shoreline/src/themes/themes'

/**
 * Built theme stylesheets, inlined by Vite so they travel with the preview
 * bundle: no static directory to serve, no restart when a theme is rebuilt,
 * and a visible error when a theme has not been built.
 */
const stylesheets = Object.fromEntries(
  Object.entries(
    import.meta.glob('../packages/shoreline/dist/themes/*/styles.css', {
      query: '?inline',
      import: 'default',
      eager: true,
    })
  ).map(([file, css]) => [file.split('/').slice(-2)[0], css])
)

const styleId = 'sl-theme'

/**
 * Applies a theme to the preview document: exposes the selection as
 * `data-sl-theme` on the document element and writes the theme stylesheet
 * into a single `<style id="sl-theme">`, so switching replaces the whole
 * theme instead of stacking two of them.
 */
export function applyTheme(theme) {
  const css = stylesheets[theme]

  if (css === undefined) {
    throw new Error(
      `Theme "${theme}" has no built stylesheet. Run "pnpm --filter @vtex/shoreline build:css" (pnpm dev:storybook runs it) and reload.`
    )
  }

  document.documentElement.dataset.slTheme = theme

  let style = document.getElementById(styleId)

  if (!style) {
    style = document.createElement('style')
    style.id = styleId
    document.head.appendChild(style)
  }

  if (style.textContent !== css) {
    style.textContent = css
  }
}

export function themeDecorator(storyFn, context) {
  const theme = context.globals.theme ?? defaultTheme

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <div
      style={{
        padding: '1rem',
      }}
    >
      {storyFn()}
    </div>
  )
}
