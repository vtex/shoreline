export const global = {
  '@font-face': {
    fontFamily: 'VTEX Trust',
    fontDisplay: 'swap',
    fontStyle: 'normal',
    src: "url('https://io.vtex.com.br/fonts/vtex-trust/VTEXTrust-VF-May-5-2022.woff2')",
    unicodeRange: `U+0020-007E, U+00A0-0107, U+010A-0113, U+0116-011B,
          U+011E-0123, U+0126-0127, U+012A-012B, U+012E-0131, U+0136-0137,
          U+0139-0148, U+014A-014D, U+0150-015B, U+015E-0167, U+016A-016B,
          U+016E-017E, U+0192, U+01EA-01EB, U+0218-021B, U+0237, U+02C6-02C7,
          U+02D8-02DD, U+0300-0304, U+0306-0308, U+030A-030C, U+0312,
          U+0326-0328, U+0335, U+0337-0338, U+0394, U+03A9, U+03BC, U+03C0,
          U+0E3F, U+1E80-1E85, U+1E9E, U+1EF2-1EF3, U+2000-200B, U+2013-2014,
          U+2018-201A, U+201C-201E, U+2020-2022, U+2026, U+202F-2030,
          U+2032-2033, U+2039-203A, U+2044, U+205F, U+2070, U+2074-2079,
          U+2080-2089, U+20A1, U+20A4, U+20A9-20AE, U+20B1, U+20B4, U+20B8-20BA,
          U+20BF, U+2117, U+2122, U+215D, U+2202, U+220F, U+2211-2212, U+221A,
          U+221E, U+222B, U+2248, U+2260, U+2264-2265, U+25CA, U+FB01-FB02`,
  },
  body: {
    margin: 0,
    bg: '$primary',
    color: '$primary',
  },
  'html, body': {
    text: '$body',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  'pre, code': { text: '$code' },
  '*': {
    text: '$body',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
    fontWeight: 'normal',
  },
  '*, ::before, ::after': {
    boxSizing: 'border-box',
    borderWidth: 0,
    borderStyle: 'solid',
  },
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, abbr, acronym, address, big, cite, del, dfn, em, img, ins, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video':
    {
      margin: 0,
      padding: 0,
      border: 0,
      verticalAlign: 'baseline',
    },
  'article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section':
    {
      display: 'block',
    },
  'blockquote, q': { quotes: 'none' },
  'blockquote:before, blockquote:after, q:before, q:after': {
    content: "''",
  },
  table: { borderCollapse: 'collapse', borderSpacing: 0 },
  '@tablet': {
    'blockquote:before, blockquote:after, q:before, q:after': {
      content: 'none',
    },
  },
}
