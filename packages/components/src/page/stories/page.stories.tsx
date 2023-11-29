import '../page.css'
import './styles.css'
import React from 'react'

import { Page } from '../index'
import { Content } from '../../content'
import { Header } from '../../header'

export default {
  title: 'shoreline-components/page',
}

export function Default() {
  return (
    <Page>
      <Header>Header</Header>
      <Content className="page-content">Page content</Content>
    </Page>
  )
}

export function Narrow() {
  return (
    <Page>
      <Header narrow>Header</Header>
      <Content narrow className="page-content">
        Page content
      </Content>
    </Page>
  )
}
