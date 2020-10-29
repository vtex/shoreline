import React from 'react'
import { Global, css } from '@vtex/admin-ui-system'

export function Preflight() {
  return (
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
        html,
        body,
        * {
          font-family: VTEXTrustVF, -apple-system, system-ui, BlinkMacSystemFont,
            sans-serif !important;
          font-variation-settings: 'wght' 92;
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
  )
}
