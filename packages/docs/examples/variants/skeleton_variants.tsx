import { Skeleton } from '@vtex/shoreline'

export function CircleSkeleton() {
  return <Skeleton shape="circle" style={{ width: 100, height: 100 }} />
}

export function RectSkeleton() {
  return <Skeleton shape="rect" style={{ width: 200, height: 100 }} />
}
