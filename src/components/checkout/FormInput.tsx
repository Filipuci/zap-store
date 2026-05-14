import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Field, FieldError, FieldLabel } from "../ui/field"
import { Input } from "../ui/input"

type Props<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  placeholder?: string
}

export const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder
}: Props<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel className={fieldState.invalid ? 'text-red-400' : ''}>
            {label}
          </FieldLabel>

          <Input
            placeholder={placeholder}
            {...field}
          />

          {fieldState.invalid &&
            <FieldError errors={[fieldState.error]} />
          }
        </Field>
      )}
    />
  )
}