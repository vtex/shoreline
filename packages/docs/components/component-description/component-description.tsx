import styles from './component-description.module.css'
import { getComponentProps } from '../../utils/get-component-props'

export function ComponentDescription(props: PropsDocsProps) {
  const { name, children } = props

  const reference = getComponentProps(name)

  if (!reference && !children) {
    return <></>
  }

  return (
    <p className={styles.description}>{children ?? reference?.description}</p>
  )
}

interface PropsDocsProps {
  name: string
  children?: string
}
