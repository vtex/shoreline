import React from 'react'

import { render, axe } from '../../test-utils'
import { Button } from '../../button'
import { Tag } from '../../tag'
import {
  Card,
  CardTitle,
  CardHeader,
  CardActions,
  CardContent,
  CardInfo,
  CardImage,
} from '..'

describe('Card tests', () => {
  it('should not have a11y violations', async () => {
    const { container } = render(
      <Card csx={{ width: '1/2', margin: 4 }}>
        <CardHeader>
          <CardInfo>
            <CardImage
              src="https://careers.vtex.com/assets/media/perspectives03.jpg"
              alt="Image description"
            />
            <CardTitle>Title</CardTitle>
            <Tag label="Short text" />
          </CardInfo>
          <CardActions>
            <Button variant="tertiary">Label</Button>
            <Button variant="secondary">Label</Button>
          </CardActions>
        </CardHeader>
        <CardContent>
          <Card>
            <CardHeader>
              <CardTitle>Title</CardTitle>
            </CardHeader>
            <CardContent csx={{ width: '100%', height: 250, bg: '$secondary' }}>
              Content
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    )

    const results = await axe(container)

    expect(results).toHaveNoViolations()
  })
})
