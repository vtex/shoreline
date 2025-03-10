import {
  Page,
  PageContent,
  PageHeader,
  PageHeaderRow,
  PageHeading,
  IconButton,
  Bleed,
  Tag,
  Flex,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  IconArrowLeft,
} from '@vtex/shoreline'

export default function Example() {
  return (
    <Page>
      <PageHeader>
        <PageHeaderRow>
          <Flex>
            <Bleed top="$space-2" bottom="$space-2">
              <IconButton
                label="Return"
                asChild
                variant="tertiary"
                size="large"
              >
                <IconArrowLeft />
              </IconButton>
            </Bleed>
            <PageHeading>Product Details</PageHeading>
            <Tag variant="secondary">Draft</Tag>
          </Flex>
        </PageHeaderRow>
      </PageHeader>
      <PageContent>
        <Table
          columnWidths={[
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
            'minmax(min-content, auto)',
          ]}
        >
          <TableHeader>
            <TableRow>
              <TableHeaderCell>Product Name</TableHeaderCell>
              <TableHeaderCell>SKU</TableHeaderCell>
              <TableHeaderCell>Brand</TableHeaderCell>
              <TableHeaderCell>Price</TableHeaderCell>
              <TableHeaderCell>Stock</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Categories</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Premium Wireless Headphones</TableCell>
              <TableCell>WH-1000XM5</TableCell>
              <TableCell>Sony</TableCell>
              <TableCell>$349.99</TableCell>
              <TableCell>128 units</TableCell>
              <TableCell>
                Industry-leading noise cancellation, exceptional sound quality
                with a lightweight design and comfortable fit for all-day
                listening.
              </TableCell>
              <TableCell>
                <Flex gap="$space-2">
                  <Tag variant="secondary">Electronics</Tag>
                  <Tag variant="secondary">Audio</Tag>
                  <Tag variant="secondary">Headphones</Tag>
                </Flex>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ultra HD Smart TV</TableCell>
              <TableCell>QN90B-55</TableCell>
              <TableCell>Samsung</TableCell>
              <TableCell>$1,299.99</TableCell>
              <TableCell>42 units</TableCell>
              <TableCell>
                Neo QLED 4K display with mini-LED technology, powerful processor
                for upscaling, and immersive sound experience.
              </TableCell>
              <TableCell>
                <Flex gap="$space-2">
                  <Tag variant="secondary">Electronics</Tag>
                  <Tag variant="secondary">TV</Tag>
                  <Tag variant="secondary">Home Theater</Tag>
                </Flex>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Professional Espresso Machine</TableCell>
              <TableCell>BES870XL</TableCell>
              <TableCell>Breville</TableCell>
              <TableCell>$699.95</TableCell>
              <TableCell>17 units</TableCell>
              <TableCell>
                Precise espresso extraction with digital temperature control,
                integrated grinder, and microfoam milk texturing.
              </TableCell>
              <TableCell>
                <Flex gap="$space-2">
                  <Tag variant="secondary">Appliances</Tag>
                  <Tag variant="secondary">Kitchen</Tag>
                  <Tag variant="secondary">Coffee</Tag>
                </Flex>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Ultralight Gaming Laptop</TableCell>
              <TableCell>G15-RTX3080</TableCell>
              <TableCell>ASUS</TableCell>
              <TableCell>$2,199.00</TableCell>
              <TableCell>23 units</TableCell>
              <TableCell>
                High-performance gaming laptop with 15.6" 240Hz display, NVIDIA
                GeForce RTX 3080, and AMD Ryzen 9 processor.
              </TableCell>
              <TableCell>
                <Flex gap="$space-2">
                  <Tag variant="secondary">Electronics</Tag>
                  <Tag variant="secondary">Computers</Tag>
                  <Tag variant="secondary">Gaming</Tag>
                </Flex>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PageContent>
    </Page>
  )
}
