import type { CheckoutSteps } from "@/types/checkout-steps"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCheckoutStore } from "@/stores/checkout-store"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { FormInput } from "./FormInput"

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>
}

export const formSchema = z.object({
  street: z.string().min(2, "Preencha o endereço"),
  number: z.string().min(2, "Preencha o número"),
  complement: z.string().optional(),
  district: z.string().min(2, "Preencha o distrito"),
  city: z.string().min(2, "Preencha a cidade"),
  state: z.string().min(2, "Preencha o estado")
})

export const StepAdress = ({ setStep }: Props) => {
  const { adress, setAdress } = useCheckoutStore(state => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { ...adress }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setAdress(values)
    setStep('finish')
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup className="grid grid-cols-2 gap-4">
        <FormInput
          control={form.control}
          name="street"
          label="Endereço"
          placeholder="Nome da rua"
        />

        <FormInput
          control={form.control}
          name="number"
          label="Número"
          placeholder="Número da residência"
        />

        <FormInput
          control={form.control}
          name="complement"
          label="Complemento"
          placeholder="Opcional"
        />

        <FormInput
          control={form.control}
          name="district"
          label="Distrito"
          placeholder="Nome do distrito"
        />

        <FormInput
          control={form.control}
          name="city"
          label="Cidade"
          placeholder="Nome da Cidade"
        />

        <Controller
          control={form.control}
          name="state"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel className={form.formState.errors.state ? 'text-red-400' : ''}>
                Estado
              </FieldLabel>

              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Estado" />
                </SelectTrigger>

                <SelectContent position="popper">
                  <SelectItem value="sp">São Paulo</SelectItem>
                  <SelectItem value="rj">Rio de Janeiro</SelectItem>
                  <SelectItem value="df">Distrito Federal</SelectItem>
                </SelectContent>
              </Select>

              {fieldState.invalid &&
                <FieldError errors={[fieldState.error]} />
              }
            </Field>
          )}
        />
      </FieldGroup>

      <div className="flex justify-between mt-4">
        <Button variant="link" onClick={() => setStep("user")}>Voltar</Button>
        <Button type="submit" variant="outline">Concluir</Button>
      </div>
    </form>
  )
}