import { useCartStore } from "@/stores/cart-store"
import { useCheckoutStore } from "@/stores/checkout-store"

export const generateMessage = () => {
  const { name, adress } = useCheckoutStore(state => state)
  const { cart } = useCartStore(state => state)

  let orderProducts = []
  for (let item of cart) {
    orderProducts.push(`${item.quantity}x ${item.product.name}`)
  }

  return `*Dados do cliente:*
Nome: ${name}
Endereço: ${adress.street}, ${adress.number}, ${adress.complement}
${adress.district}, ${adress.city}, ${adress.state}
---------
*Pedido:* 
${orderProducts.join('\n')}
`
}