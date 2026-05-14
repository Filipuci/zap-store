import { useCheckoutStore } from "@/stores/checkout-store"
import { Button } from "../ui/button"
import { generateMessage } from "@/lib/generate-message"

export const StepFinish = () => {
  const { name } = useCheckoutStore(state => state)

  const message = generateMessage()
  const linkZap = `https://wa.me//${import.meta.env.VITE_PUBLIC_ZAP}?text=${encodeURI(message)}`

  return (
    <div className="text-center flex flex-col gap-5">
      <p>Perfeito <strong>{name}</strong>!</p>
      <p>Agora envie seu pedido para o nosso Whatsapp para concluir. Nosso atendente irá te guiar sobre o andamento do pedido.</p>
      <Button asChild>
        <a target="_blank" href={linkZap}>Enviar para o WhatsApp</a>
      </Button>
    </div>
  )
}