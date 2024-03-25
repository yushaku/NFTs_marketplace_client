import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type Inputs = {
  amount: number
  lockType: number
}

const schema = yup
  .object({
    amount: yup.number().positive().required(),
    lockType: yup.number().positive().integer().required()
  })
  .required()

export const StakeForm = () => {
  const [apy, setApy] = useState(lockType[0].apy)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  function onSubmit(data: Inputs) {
    console.log(data)
  }

  return (
    <>
      <section className="w-[500px] mt-5 p-8 rounded-lg bg-background z-50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <h3 className="text-xl font-bold">Stake Form</h3>
        <p>Your APY: {apy}%</p>

        <form
          className="flex flex-col gap-5 mt-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3">
            {lockType.map((type, index) => {
              return (
                <label
                  htmlFor={type.id}
                  key={index}
                  className={`px-4 py-3 border border-gray-700 rounded-lg ${apy === type.apy && 'bg-accent'}`}
                  onClick={() => setApy(type.apy)}
                >
                  {type.title}
                  <input
                    id={type.id}
                    checked={index === 0}
                    value={index}
                    type="radio"
                    radioGroup="locktype"
                    className={`hidden`}
                    {...register('lockType', { required: true })}
                  />
                </label>
              )
            })}
          </div>

          <input
            type="text"
            placeholder="Amount"
            className={`w-full p-3 bg-layer rounded-lg ${errors.amount ?? 'border-red-400'}`}
            {...register('amount', { required: true })}
          />

          <input
            className="mt-5 w-full p-3 bg-accent rounded-lg"
            type="submit"
          />
        </form>
      </section>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-700/50 z-40" />
    </>
  )
}

const lockType = [
  {
    title: '0 Day',
    id: '0_day',
    apy: 5
  },
  {
    title: '90 Days',
    id: '90_days',
    apy: 15
  },
  {
    title: '180 Days',
    id: '180_days',
    apy: 30
  }
]
