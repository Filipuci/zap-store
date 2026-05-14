import type { Product } from "@/types/Product";
import { Button } from "../ui/button";
import { toast } from "sonner"
import { useCartStore } from "@/stores/cart-store";

type Props = {
  item: Product
}

export const ProductItem = ({ item }: Props) => {
  const { upsertCartItem } = useCartStore(state => state)

  const handleAddToCart = () => {
    upsertCartItem(item, 1)
    toast.success('Produto adicionado!', {
      action: {
        label: 'Fechar',
        onClick: () => toast.dismiss()
      }
    })
  }

  return (
    <div>
      <div className="rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-32 object-cover"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <p className="text-lg">{item.name}</p>
        <p className="text-sm opacity-50">$ {item.price.toFixed(2)}</p>
      </div>

      <Button
        className="mt-2 w-full cursor-pointer"
        onClick={handleAddToCart}
      >
        Adicionar
      </Button>
    </div>
  )
}