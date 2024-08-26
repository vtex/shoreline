import { Skeleton } from '../index'

export default {
  title: 'components/skeleton',
}

export function Show() {
  return (
    <div>
      <Skeleton width="200px" height="200px" />
      <Skeleton shape="circle" width="200px" height="200px" />
    </div>
  )
}
