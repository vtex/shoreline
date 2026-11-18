import { describe, expect, it } from 'vitest'

import { getAttachmentTag } from '../attachment-utils'

describe('getAttachmentTag', () => {
  it.each([
    ['report.pdf', 'PDF', 'red'],
    ['report.docx', 'DOCX', 'blue'],
    ['report.doc', 'DOC', 'blue'],
    ['sheet.xlsx', 'XLSX', 'green'],
    ['sheet.xls', 'XLS', 'green'],
    ['stock.csv', 'CSV', 'orange'],
  ])('tags %s as %s in %s', (name, label, tone) => {
    expect(getAttachmentTag(name)).toEqual({ label, tone })
  })

  it('ignores the case of the extension', () => {
    expect(getAttachmentTag('REPORT.PDF')).toEqual({
      label: 'PDF',
      tone: 'red',
    })
  })

  it('shows an unknown extension in capitals with the gray tone', () => {
    expect(getAttachmentTag('notes.txt')).toEqual({
      label: 'TXT',
      tone: 'gray',
    })
  })

  it('uses the last extension of a name with several dots', () => {
    expect(getAttachmentTag('archive.v2.pdf').label).toBe('PDF')
  })

  it('falls back to FILE when the name has no extension', () => {
    expect(getAttachmentTag('README')).toEqual({ label: 'FILE', tone: 'gray' })
  })
})
