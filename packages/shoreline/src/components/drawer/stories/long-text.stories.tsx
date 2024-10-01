import { DrawerProvider } from '../drawer-provider'
import { Button } from '../../button'
import { DrawerTrigger } from '../drawer-trigger'
import { DrawerPopover } from '../drawer-popover'
import { DrawerHeading } from '../drawer-heading'
import { DrawerHeader } from '../drawer-header'
import { DrawerContent } from '../drawer-content'
import { Text } from '../../text'
import { DrawerDismiss } from '../drawer-dismiss'
import { DrawerFooter } from '../drawer-footer'

import './stories.css'

export default {
  title: 'components/drawer',
}

export function LongText() {
  return (
    <DrawerProvider>
      <DrawerTrigger asChild>
        <Button variant="primary">Open</Button>
      </DrawerTrigger>
      <DrawerPopover>
        <DrawerHeader>
          <DrawerHeading>Drawer Heading</DrawerHeading>
          <DrawerDismiss />
        </DrawerHeader>
        <DrawerContent>
          <div className="long-text">
            <Text variant="body" as="p">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              ornare egestas sem. Praesent fringilla at lorem sit amet
              ultricies. Vestibulum hendrerit, lorem ac pellentesque auctor,
              neque dui elementum dui, in consequat orci dui sit amet ipsum.
              Suspendisse id posuere eros, sed blandit diam. Suspendisse auctor
              at neque sed elementum. Nunc tempor, mauris sit amet consequat
              tristique, est dui fringilla tortor, in aliquet nibh orci non
              risus. Donec pharetra enim mauris, ac sodales arcu vulputate
              hendrerit. Aenean nec pulvinar eros. Nam felis ex, venenatis id
              lacinia quis, dictum at ipsum. Morbi aliquam leo eget sem
              sollicitudin, vel porttitor mauris pulvinar. Nam ultricies, ante
              et dictum tristique, dui magna cursus sapien, et interdum diam
              odio in erat.
            </Text>
            <Text variant="body" as="p">
              Phasellus vitae sagittis sem. Cras facilisis ante purus, non
              euismod augue finibus sed. Phasellus viverra ipsum vitae nisi
              eleifend, eu semper eros posuere. Praesent volutpat molestie eros
              quis laoreet. Vestibulum sollicitudin nunc eu velit maximus
              mollis. Praesent quis sapien odio. Donec commodo eget sapien nec
              condimentum. Curabitur sapien nibh, placerat et faucibus sed,
              aliquam a lacus. Class aptent taciti sociosqu ad litora torquent
              per conubia nostra, per inceptos himenaeos. Phasellus facilisis,
              lacus sit amet semper auctor, metus turpis aliquet augue, et
              dignissim turpis massa vel eros. Morbi non ipsum ac diam varius
              condimentum.
            </Text>
            <Text variant="body" as="p">
              Etiam malesuada dapibus orci nec efficitur. Proin mattis mauris a
              nibh tincidunt, eu volutpat sem convallis. Proin libero risus,
              feugiat at aliquam sed, aliquet sed felis. Maecenas sit amet
              ultrices ex. Nulla et semper mauris. Nulla pulvinar eget purus
              vitae feugiat. Cras tincidunt lectus ac faucibus semper. Nulla nec
              accumsan elit, ut sodales nibh. Duis quis facilisis tortor, vel
              aliquet urna.
            </Text>
            <Text variant="body" as="p">
              In hac habitasse platea dictumst. Pellentesque nisi orci, rutrum
              sed diam a, finibus facilisis mi. Nulla nec neque gravida,
              tincidunt ligula quis, semper lacus. Cras sodales lacus vitae arcu
              tempus pellentesque. Integer vel ullamcorper turpis. Donec
              sollicitudin vestibulum sem, eget ornare purus ultrices eu.
              Pellentesque finibus massa quis risus molestie, sed semper felis
              volutpat. Praesent vestibulum dolor ac augue dapibus bibendum.
              Praesent scelerisque iaculis dictum. Nam eu maximus nibh. Maecenas
              egestas consectetur orci.
            </Text>
            <Text variant="body" as="p">
              Ut vitae gravida mi, ut luctus ligula. Phasellus a nunc nec lacus
              fringilla elementum sed in arcu. Cras est enim, egestas ac lorem
              elementum, rhoncus finibus nulla. Cras egestas mauris non nulla
              euismod, a rutrum velit bibendum. Integer sit amet velit
              tristique, ultrices quam eu, tincidunt diam. Duis leo metus,
              rutrum imperdiet facilisis a, accumsan nec tortor. Praesent at
              nibh eu neque eleifend vulputate quis sed arcu. In eros lectus,
              sodales nec enim non, sagittis gravida nisi. Sed in augue vitae
              mauris rutrum tempus. Donec nibh lacus, facilisis nec condimentum
              quis, sagittis eget magna.
            </Text>
            <Text variant="body" as="p">
              Duis ante eros, pharetra vel facilisis ut, aliquet sit amet
              libero. Morbi feugiat consectetur metus, eget efficitur lectus
              cursus vel. In accumsan consectetur mollis. Sed tempor fringilla
              ante a convallis. Nunc sit amet lectus convallis, laoreet orci
              vitae, blandit erat. Orci varius natoque penatibus et magnis dis
              parturient montes, nascetur ridiculus mus. Proin maximus semper
              sem sit amet ultrices. Nam ac tempus neque. Vivamus consequat urna
              et quam pellentesque tincidunt. Phasellus sodales lorem neque, nec
              accumsan nisi pretium sed. Praesent porttitor odio et turpis
              cursus pulvinar. Vivamus eu fringilla urna. Vivamus vel ipsum nec
              dui blandit luctus. Phasellus sit amet pulvinar justo. Integer
              imperdiet sagittis enim a pretium.
            </Text>
            <Text variant="body" as="p">
              Morbi feugiat pulvinar malesuada. Etiam dapibus arcu interdum
              dignissim convallis. Suspendisse sit amet varius odio. Curabitur
              dignissim molestie ligula, vel scelerisque dolor tempus ac.
              Vivamus dapibus sit amet nisi eget sodales. Proin eget ornare
              nunc. In ut tortor imperdiet magna tincidunt tempor. Quisque
              vulputate mauris non nisi varius, sed pretium velit posuere.
              Praesent a est eu eros lobortis vehicula. Pellentesque massa
              tellus, hendrerit quis mauris ut, tincidunt varius dolor. Morbi
              vitae augue non elit iaculis luctus. Sed quis eleifend nisi, sit
              amet volutpat enim. Suspendisse a tincidunt magna, auctor
              condimentum neque. Ut egestas ex vel purus congue, sit amet
              interdum leo consequat.
            </Text>
            <Text variant="body" as="p">
              Praesent eget dolor quis metus bibendum ultricies. Nulla
              pellentesque magna id sapien egestas accumsan. Nullam vel odio
              velit. Suspendisse vehicula justo nisi, vitae porta turpis mattis
              quis. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Phasellus iaculis velit quis arcu
              imperdiet luctus. Maecenas in lorem vel odio ornare pharetra at ac
              sapien. Praesent in cursus ex. In ac malesuada felis. Integer
              massa leo, vulputate nec vehicula sit amet, ornare sed metus.
              Vivamus eu porttitor turpis, id tristique orci. Vestibulum posuere
              quis diam at imperdiet. Sed sed luctus odio, id gravida arcu.
            </Text>
            <Text variant="body" as="p">
              Pellentesque scelerisque elit vitae mattis bibendum. Orci varius
              natoque penatibus et magnis dis parturient montes, nascetur
              ridiculus mus. Morbi at vulputate risus, ut malesuada mi. Cras
              dictum leo a ex mattis tincidunt. Duis tristique ligula eu dolor
              venenatis interdum. Aenean fringilla sem ut blandit tincidunt. Nam
              vitae pulvinar magna, sit amet viverra tellus. Class aptent taciti
              sociosqu ad litora torquent per conubia nostra, per inceptos
              himenaeos. Nullam gravida ex in orci viverra, ut mattis augue
              accumsan. Cras vehicula accumsan dolor vel blandit. Maecenas quis
              porttitor felis, sed molestie nunc. Cras quis pellentesque neque.
              Morbi iaculis lectus eros, vitae vulputate dolor tempus eu. Mauris
              tincidunt turpis eu mauris porttitor vulputate. Nullam rhoncus
              massa sit amet ante fringilla, ac lobortis velit congue. Nullam
              faucibus vitae orci sed venenatis.
            </Text>
            <Text variant="body" as="p">
              Nullam vestibulum non purus sed scelerisque. Aliquam luctus justo
              pretium justo sollicitudin vulputate. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Nunc malesuada lacinia luctus. Sed tincidunt, tellus vel varius
              pulvinar, elit mi pulvinar tellus, non accumsan neque sem in
              libero. Nam non ipsum et nunc fringilla pharetra at ac lectus.
              Vivamus lobortis mattis mauris non tincidunt. Etiam finibus sem id
              diam suscipit, vitae pharetra nunc maximus. Suspendisse bibendum
              orci non diam euismod eleifend. Curabitur convallis est libero, et
              vestibulum lorem rhoncus ut. Integer aliquet tortor risus, a
              tincidunt magna eleifend ut. Pellentesque fermentum tristique ex,
              eu scelerisque nulla ultrices sit amet. Phasellus malesuada urna
              sit amet cursus iaculis. Class aptent taciti sociosqu ad litora
              torquent per conubia nostra, per inceptos himenaeos. Nullam id
              rhoncus metus, convallis maximus magna.
            </Text>
          </div>
        </DrawerContent>
        <DrawerFooter>
          <Button onClick={() => null} size="large">
            Label
          </Button>
          <Button variant="primary" onClick={() => null} size="large">
            Label
          </Button>
        </DrawerFooter>
      </DrawerPopover>
    </DrawerProvider>
  )
}
