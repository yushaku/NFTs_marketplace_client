/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { cn } from '@/utils'

type Props<TInputs> = {
  onSubmit: (data: TInputs) => void
  schema: typeof yup.ObjectSchema<TInputs>
}

export function Form<TInputs>({ schema, onSubmit }: Props<TInputs>) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<TInputs>({ resolver: yupResolver(schema) })

  return (
    <form
      className="mt-5 flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      {Object.keys(schema.fields).map((key: any) => {
        return (
          <input
            key={key}
            type="text"
            placeholder="Amount"
            className={cn(
              'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none',
              { 'border-red-400': errors[key]?.message }
            )}
            {...register(key, { required: true })}
          />
        )
      })}
    </form>
  )
}
