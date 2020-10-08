/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
export default function track(event: string, meta?: any) {
  return () => {
    // @ts-ignore
    if (typeof dataLayer !== 'undefined' && Array.isArray(dataLayer)) {
      // @ts-ignore
      dataLayer.push({ event, meta })
    }
  }
}
