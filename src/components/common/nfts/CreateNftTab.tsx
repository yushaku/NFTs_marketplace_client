import { Button } from '@/components/common/Button'
import { cn } from '@/utils'
import { TrashIcon } from '@heroicons/react/16/solid'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Inputs = {
  name: number
  description: string
}

// const schema = yup.object({
//   name: yup.number().positive().required(),
//   description: yup.string()
// })

export const CreateNftTab = () => {
  const [media, setMedia] = useState<File | null>()

  const [properties, setProperties] = useState<
    Array<{ [type: string]: string }>
  >([])
  const [property, setProperty] = useState({ trait: '', value: '' })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()

  async function onSubmit(data: Inputs) {
    const { name, description } = data
    console.log({
      name,
      description,
      media,
      properties
    })
  }

  return (
    <div className="flex gap-10">
      <form
        className="mt-5 flex flex-col gap-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Name"
          required
          className={cn(
            'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none',
            { 'border-red-400': errors.name?.message }
          )}
          {...register('name', { required: true })}
        />

        <input
          type="file"
          placeholder="file"
          onChange={(e) => {
            setMedia(e.target.files?.[0])
          }}
          className={cn(
            'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none'
          )}
        />

        <textarea
          rows={5}
          placeholder="description"
          className={cn(
            'w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none',
            { 'border-red-400': errors.description?.message }
          )}
          {...register('description', { required: true })}
        />

        <h3 className="text-xl">Properties</h3>
        {properties.map((prop) => {
          console.log(prop)

          return (
            <label className="flex gap-3">
              <span className="flex-1 rounded-lg bg-focus p-3">
                {prop.trait}
              </span>
              <span className="flex-1 rounded-lg bg-focus p-3">
                {prop.value}
              </span>
              <span className="col-span-1 flex gap-3 rounded-lg bg-focus p-3 hover:bg-red-500">
                <TrashIcon className="size-5" />
              </span>
            </label>
          )
        })}

        <label className="flex gap-3">
          <input
            value={property.trait}
            onChange={(e) =>
              setProperty({ ...property, trait: e.target.value })
            }
            placeholder="trait"
            className="w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none"
          />
          <input
            value={property.value}
            onChange={(e) =>
              setProperty({ ...property, value: e.target.value })
            }
            placeholder="value"
            className="w-full rounded-lg border-2 border-gray-700 bg-layer p-3  focus:border-gray-500 focus:outline-none"
          />
        </label>
        <Button
          onClick={() => {
            setProperties([...properties, property])
            setProperty({ trait: '', value: '' })
          }}
          title="Add more"
          className="w-1/2"
        />
      </form>

      <article className="flex-1">
        {media && <img src={URL.createObjectURL(media)} className="size-4/5" />}
      </article>
    </div>
  )
}
