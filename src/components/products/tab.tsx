import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAllProducts } from "@/services/product"
import type { Product } from "@/types/Product"
import { ProductEmpty } from "./empty"
import { ProductItem } from "./ProductItem"

type Tab = {
  title: string,
  value: string,
  products: Product[]
}

export const ProductsTab = async () => {
  const products = await getAllProducts()

  const tabs: Tab[] = [
    {
      title: 'Sushi',
      value: 'sushi',
      products: products.filter(item => item.category === 'sushi')
    },
    {
      title: 'Temaki',
      value: 'temaki',
      products: products.filter(item => item.category === 'temaki')
    },
    {
      title: 'Combos',
      value: 'pack',
      products: products.filter(item => item.category === 'pack')
    },
    {
      title: 'Bebidas',
      value: 'beverage',
      products: products.filter(item => item.category === 'beverage')
    },
  ]

  return (
    <Tabs defaultValue={"sushi"}>
      <TabsList className="flex w-full">
        {tabs.map(trigger => (
          <TabsTrigger
            key={trigger.value}
            value={trigger.value}
            className="flex-1">{trigger.title}</TabsTrigger>
        ))}
      </TabsList>

      {tabs.map(content => (
        <TabsContent key={content.value} value={content.value}>
          {content.products.length > 0 &&
            <div className="grid gap-5 grid-cols-2 sm:grid-cols-3 md:grid-cols-4">
              {content.products.map(product => (
                <ProductItem
                  key={product.id}
                  item={product}
                />
              ))}
            </div>
          }

          {content.products.length === 0 && <ProductEmpty />}

        </TabsContent>
      ))}
    </Tabs>
  )
}