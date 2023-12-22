import '../empty-state.css'
import './styles.css'
import React from 'react'
import illustration from './Illustration.png'

import { EmptyState } from '../index'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/empty-state',
}

export function Default() {
  return (
    <div className="screen-container">
      <EmptyState
        src={illustration}
        title="Title goes here"
        description="Before you write the description here please visit the Shoreline documentation website to learn more about this componente and its usage."
      >
        <Button>Label</Button>
        <Button variant="primary">Label</Button>
      </EmptyState>
    </div>
  )
}

export function Table() {
  return (
    <div className="screen-container">
      <EmptyState
        title="No products created"
        description="Create products to start selling in your store"
      >
        <Button variant="primary">Create product</Button>
      </EmptyState>
    </div>
  )
}
