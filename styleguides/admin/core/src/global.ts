import { theme } from '@vtex/admin-ui-theme'
import { Global, css } from '@emotion/react'
import { get, jsxs } from './system'

export function GlobalStyles() {
  return jsxs(Global, {
    styles: css`
      @import 'https://io.vtex.com.br/fonts/vtex-trust/style.css';
      body {
        margin: 0;
        background-color: ${get(theme, 'colors.light.primary')};
        color: ${get(theme, 'colors.dark.primary')};
      }
      html,
      body {
        font-family: ${get(theme, 'fonts.sans')} !important;
        font-variation-settings: ${get(theme, 'fontSettings.regular')};
      }
      strong,
      b {
        font-family: ${get(theme, 'fonts.sans')} !important;
        font-variation-settings: ${get(theme, 'fontSettings.bold')};
      }
      pre,
      code {
        font-family: ${get(theme, 'fonts.mono')} !important;
      }
      * {
        font-family: ${get(theme, 'fonts.sans')} !important;
        font-variation-settings: ${get(theme, 'fontSettings.regular')};
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
      a,
      abbr,
      acronym,
      address,
      big,
      cite,
      del,
      dfn,
      em,
      img,
      ins,
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
    `,
  })
}
