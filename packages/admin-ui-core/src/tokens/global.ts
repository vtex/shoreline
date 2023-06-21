export const global = {
  body: {
    margin: '$space-0',
    bg: '$primary',
    color: '$primary',
  },
  'html, body': {
    text: '$body',
    fontSize: '100%',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  'pre, code': { text: '$code' },
  '*': {
    text: '$body',
    '-webkit-font-smoothing': 'antialiased',
    '-moz-osx-font-smoothing': 'grayscale',
  },
  '*, ::before, ::after': {
    boxSizing: 'border-box',
    borderWidth: 0,
    borderStyle: 'solid',
  },
  'html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, a, abbr, acronym, address, big, cite, del, dfn, em, img, ins, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video':
    {
      margin: '$space-0',
      padding: '$space-0',
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
