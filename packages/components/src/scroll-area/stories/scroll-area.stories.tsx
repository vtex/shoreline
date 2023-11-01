import '../../../dist/styles.min.css'
import '../scroll-area.css'
import React from 'react'

import { ScrollArea } from '../index'
import { Text } from '../../text'
import { Container, Content } from '../../content'
import { Popover, PopoverProvider, PopoverTrigger } from '../../popover'
import { Button } from '../../button'

export default {
  title: 'shoreline-components/scroll-area',
}

export function Default() {
  return (
    <ScrollArea
      style={{
        width: 256,
        height: 256,
      }}
    >
      <Container>
        <Content>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            cursus sapien vitae nibh tristique, eget accumsan ligula interdum.
            Sed eu nisi tincidunt, tempor tortor vitae, porta urna. Vestibulum
            mi leo, aliquam et congue id, convallis quis enim. In hac habitasse
            platea dictumst. Vivamus fermentum risus vitae tincidunt rhoncus.
            Integer pretium, sem vitae malesuada mattis, tellus ligula
            vestibulum purus, nec sodales turpis massa vitae ex. Phasellus vel
            nunc ultricies felis rutrum tristique. Ut a odio eget dolor
            vestibulum tincidunt. Orci varius natoque penatibus et magnis dis
            parturient montes, nascetur ridiculus mus. Pellentesque efficitur
            pellentesque malesuada. Nunc tempor quam sem, eget posuere neque
            lacinia dictum.
          </Text>
          <Text>
            Class aptent taciti sociosqu ad litora torquent per conubia nostra,
            per inceptos himenaeos. Phasellus non sapien elementum, aliquam leo
            id, aliquam tellus. Curabitur consequat, ante vel molestie pulvinar,
            nisl sapien ornare ligula, ac luctus lorem mauris sit amet leo.
            Donec aliquam nunc ligula, in efficitur neque luctus ultricies.
            Praesent vestibulum mi ultrices diam vulputate mollis. Aenean tempus
            mi ac aliquet imperdiet. Aenean sollicitudin lobortis velit viverra
            lobortis. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            In ligula ligula, scelerisque nec bibendum laoreet, facilisis a
            purus. Nullam non risus mollis, euismod dui ac, ultrices tellus.
            Mauris molestie, magna id malesuada semper, risus lorem fringilla
            sapien, vehicula aliquet dolor elit sed magna. Proin a orci
            ultrices, semper purus quis, luctus eros. Praesent viverra dui id
            diam sodales lobortis. Nulla lobortis, tortor ornare blandit
            accumsan, augue nisl fermentum elit, egestas imperdiet risus ex
            vitae lacus.
          </Text>
        </Content>
      </Container>
    </ScrollArea>
  )
}

export function WithPopover() {
  return (
    <PopoverProvider>
      <PopoverTrigger asChild>
        <Button>Toggle</Button>
      </PopoverTrigger>
      <Popover
        style={{
          width: 256,
          height: 256,
        }}
      >
        <ScrollArea>
          <Content>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum cursus sapien vitae nibh tristique, eget accumsan
              ligula interdum. Sed eu nisi tincidunt, tempor tortor vitae, porta
              urna. Vestibulum mi leo, aliquam et congue id, convallis quis
              enim. In hac habitasse platea dictumst. Vivamus fermentum risus
              vitae tincidunt rhoncus. Integer pretium, sem vitae malesuada
              mattis, tellus ligula vestibulum purus, nec sodales turpis massa
              vitae ex. Phasellus vel nunc ultricies felis rutrum tristique. Ut
              a odio eget dolor vestibulum tincidunt. Orci varius natoque
              penatibus et magnis dis parturient montes, nascetur ridiculus mus.
              Pellentesque efficitur pellentesque malesuada. Nunc tempor quam
              sem, eget posuere neque lacinia dictum.
            </Text>
            <Text>
              Class aptent taciti sociosqu ad litora torquent per conubia
              nostra, per inceptos himenaeos. Phasellus non sapien elementum,
              aliquam leo id, aliquam tellus. Curabitur consequat, ante vel
              molestie pulvinar, nisl sapien ornare ligula, ac luctus lorem
              mauris sit amet leo. Donec aliquam nunc ligula, in efficitur neque
              luctus ultricies. Praesent vestibulum mi ultrices diam vulputate
              mollis. Aenean tempus mi ac aliquet imperdiet. Aenean sollicitudin
              lobortis velit viverra lobortis. Lorem ipsum dolor sit amet,
              consectetur adipiscing elit. In ligula ligula, scelerisque nec
              bibendum laoreet, facilisis a purus. Nullam non risus mollis,
              euismod dui ac, ultrices tellus. Mauris molestie, magna id
              malesuada semper, risus lorem fringilla sapien, vehicula aliquet
              dolor elit sed magna. Proin a orci ultrices, semper purus quis,
              luctus eros. Praesent viverra dui id diam sodales lobortis. Nulla
              lobortis, tortor ornare blandit accumsan, augue nisl fermentum
              elit, egestas imperdiet risus ex vitae lacus.
            </Text>
          </Content>
        </ScrollArea>
      </Popover>
    </PopoverProvider>
  )
}
