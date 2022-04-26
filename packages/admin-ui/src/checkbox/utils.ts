import { get, theme } from '@vtex/admin-ui'

type IconState = 'disabled'

export const checkmarkSvg = (state?: IconState) => {
  const isDisabled = state === 'disabled'
  const fillColor = isDisabled
    ? get(theme, 'fg.disabled', '')
    : get(theme, 'fg.form.controlChecked', '')

  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M14.0303 3.96993C14.3232 4.26283 14.3232 4.7377 14.0303 5.03059L7.03032 12.0303C6.73743 12.3231 6.26259 12.3232 5.96969 12.0303L2.46969 8.5306C2.17679 8.23772 2.17677 7.76284 2.46965 7.46994C2.76253 7.17703 3.2374 7.17701 3.53031 7.46989L6.49999 10.4393L12.9697 3.9699C13.2626 3.67702 13.7375 3.67703 14.0303 3.96993Z" fill="${encodeURIComponent(
    fillColor
  )}"/></svg>`
}

export const indeterminateSvg = (state?: IconState) => {
  const isDisabled = state === 'disabled'
  const fillColor = isDisabled
    ? get(theme, 'fg.disabled', '')
    : get(theme, 'fg.form.controlNeutral', 'black')

  return `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 8C1.75 7.58579 2.08579 7.25 2.5 7.25H13.5C13.9142 7.25 14.25 7.58579 14.25 8C14.25 8.41421 13.9142 8.75 13.5 8.75H2.5C2.08579 8.75 1.75 8.41421 1.75 8Z" fill="${encodeURIComponent(
    fillColor
  )}"/></svg>`
}
