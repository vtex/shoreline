import './styles.css'
import React from 'react'

import { Header } from '../index'
import { Container, Content } from '../../content'
import { Page } from '../../page'

export default {
  title: 'shoreline-components/header',
}

export function Default() {
  return (
    <Container>
      <Header>Header</Header>
    </Container>
  )
}

export function WithPage() {
  return (
    <Page>
      <Header narrow>Header</Header>
      <Content narrow className='page-content'>
        Page content
      </Content>
    </Page>
  )
}

export function OnComponent() {
  return (
    <Container>
      <div className="card-like-component">
        <Header>Component header</Header>
        <Content>Text</Content>
      </div>
    </Container>
  )
}
