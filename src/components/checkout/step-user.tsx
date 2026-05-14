import type { CheckoutSteps } from "@/types/checkout-steps"
import type { Dispatch, SetStateAction } from "react"
import { Controller, useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useCheckoutStore } from "@/stores/checkout-store"
import { Input } from "@/components/ui/input"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Button } from "@/components/ui/button"

type Props = {
  setStep: Dispatch<SetStateAction<CheckoutSteps>>
}

const formSchema = z.object({
  name: z.string().min(2, "Preencha seu nome corrretamente.")
})

export const StepUser = ({ setStep }: Props) => {
  const { name, setName } = useCheckoutStore(state => state)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name }
  })

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setName(values.name)
    setStep('adress')
  }

  return (
    <div>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel
                className={form.formState.errors.name ? 'text-red-400' : ''}
              >
                Seu nome
              </FieldLabel>
              <Input
                autoFocus
                placeholder="Qual seu nome?"
                {...field}
              />


              {fieldState.invalid &&
                <FieldError errors={[fieldState.error]} />
              }
            </Field>
          )}
        />

        <Button type="submit" variant="outline">Próximo</Button>
      </form>
    </div>
  )
}