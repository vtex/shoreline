import React, { ReactNode } from 'react'
import {
  createSystem,
  useTheme,
  useClassName,
  createElement,
  useResponsiveValue,
  get,
  merge,
  StyleProp,
  StyleObject,
} from '@vtex/admin-ui-system'
import { css, Global } from '@emotion/react'
import { theme } from '@vtex/admin-ui-theme'
import 'focus-visible/dist/focus-visible'

interface ThemeProviderProps {
  children?: ReactNode
}

const { ThemeProvider: BaseProvider, cn, stylesOf } = createSystem(theme)

function ThemeProvider(props: ThemeProviderProps) {
  const { children } = props

  return (
    <BaseProvider>
    <Global
      styles={css`
            @import 'https://io.vtex.com.br/fonts/vtex-trust/style.css';

            code > * > *,
            pre > * > *,
            code,
            pre {
              font-family: 'SF Mono', 'Operator Mono', 'Dank Mono',
                'Fira Code Retina', 'Fira Code', 'FiraCode-Retina', Consolas, Monaco,
                monospace !important;
            }

            body {
              margin: 0;
              background-color: ${get(theme, 'colors.background')};
              color: ${get(theme, 'colors.text')};
            }

            html,
            body,
            * {
              font-family: VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont,
                sans-serif !important;
              font-variation-settings: 'wght' 92;
            }

            *,
            ::before,
            ::after {
              box-sizing: border-box;
              border-width: 0;
              border-style: solid;
            }

            html,
            body,
            div,
            span,
            applet,
            object,
            iframe,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6,
            p,
            blockquote,
            pre,
            a,
            abbr,
            acronym,
            address,
            big,
            cite,
            code,
            del,
            dfn,
            em,
            img,
            ins,
            kbd,
            q,
            s,
            samp,
            small,
            strike,
            strong,
            sub,
            sup,
            tt,
            var,
            b,
            u,
            i,
            center,
            dl,
            dt,
            dd,
            ol,
            ul,
            li,
            fieldset,
            form,
            label,
            legend,
            table,
            caption,
            tbody,
            tfoot,
            thead,
            tr,
            th,
            td,
            article,
            aside,
            canvas,
            details,
            embed,
            figure,
            figcaption,
            footer,
            header,
            hgroup,
            menu,
            nav,
            output,
            ruby,
            section,
            summary,
            time,
            mark,
            audio,
            video {
              margin: 0;
              padding: 0;
              border: 0;
              font-size: 100%;
              font: inherit;
              vertical-align: baseline;
            }

            /* HTML5 display-role reset for older browsers */
            article,
            aside,
            details,
            figcaption,
            figure,
            footer,
            header,
            hgroup,
            menu,
            nav,
            section {
              display: block;
            }

            body {
              line-height: 1;
            }

            blockquote,
            q {
              quotes: none;
            }

            blockquote:before,
            blockquote:after,
            q:before,
            q:after {
              content: '';
              content: none;
            }

            table {
              border-collapse: collapse;
              border-spacing: 0;
            }
          `}
        />
      {children}
    </BaseProvider>
  )
}

export {
  ThemeProvider,
  cn,
  useClassName,
  useTheme,
  useResponsiveValue,
  get,
  merge,
  theme,
  StyleProp,
  StyleObject,
  stylesOf,
  createElement,
}
