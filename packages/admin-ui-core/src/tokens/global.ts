import { typography } from '../values'

export const global = {
  ...typography.fontFace.vtexTrust,
  body: {
    margin: 0,
    bg: '$primary',
    color: '$primary',
  },
  'html, body': {
    fontFamily: typography.fontStack.sans,
    fontVariationSettings: typography.fontWeight.regular,
  },
  'pre, code': { fontFamily: typography.fontStack.mono },
  '*': {
    fontFamily: typography.fontStack.sans,
    fontVariationSettings: typography.fontWeight.regular,
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
    content: ["''", 'none'],
  },
  table: { borderCollapse: 'collapse', borderSpacing: 0 },
}
