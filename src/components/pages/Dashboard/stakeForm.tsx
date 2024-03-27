import { stakeModuleABI } from '@/abi/stakeModule'
import { Input } from '@/components/common/Input'
import ModalWarp from '@/components/common/ModalWarper'
import { STAKE_ADRESS } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { parseUnits } from 'viem'
import {
  useWaitForTransactionReceipt as useWaitTx,
  useWriteContract
} from 'wagmi'
import * as yup from 'yup'

type Inputs = {
  amount: number
  lockType: number
}

const schema = yup
  .object({
    amount: yup.number().positive().required(),
    lockType: yup.number().default(0)
  })
  .required()

type Props = {
  isOpen: boolean
  setOpen: () => void
  accountBalance: string
}

export const StakeForm = ({ isOpen, setOpen, accountBalance }: Props) => {
  const [apy, setApy] = useState(lockType[0].apy)
  const { data: hash, isPending, writeContract } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitTx({
    hash: hash
  })

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<Inputs>({ resolver: yupResolver(schema) })

  function onSubmit(data: Inputs) {
    const { amount, lockType } = data
    const bigintValue = parseUnits(String(amount), 18)

    writeContract({
      address: STAKE_ADRESS,
      abi: stakeModuleABI,
      functionName: 'stake',
      args: [bigintValue, lockType]
    })
  }

  return (
    <ModalWarp title="Stake" isOpen={isOpen} handleClose={() => setOpen()}>
      <section className="w-[500px]">
        <p className="text-sm text-gray-300">Your APY: {apy}%</p>
        <form
          className="mt-5 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex gap-3">
            {lockType.map((type, index) => {
              return (
                <label
                  htmlFor={type.id}
                  key={index}
                  className={`rounded-lg border border-gray-700 px-4 py-3 ${apy === type.apy && 'bg-accent'}`}
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

          <label className="relative">
            <Input
              type="text"
              placeholder="Amount"
              error={errors.amount?.message}
              {...register('amount', { required: true })}
            />
            <span
              onClick={() => setValue('amount', Number(accountBalance))}
              className="absolute right-5 top-3 cursor-pointer text-accent"
            >
              Max
            </span>
          </label>

          <p>
            your balance: {accountBalance}
            <img
              className="ml-2 inline-block size-8"
              src="/logo.png"
              alt="logo"
            />
          </p>

          <input
            type="submit"
            value={isPending ? 'Pending...' : 'Stake'}
            disabled={isPending}
            className="mt-5 w-full cursor-pointer rounded-lg bg-accent p-3 hover:bg-lighterAccent"
          />
        </form>

        {hash && <div>Transaction Hash: {hash}</div>}
        {isConfirming && <div>Waiting for confirmation...</div>}
        {isConfirmed && <div>Transaction confirmed.</div>}
      </section>
    </ModalWarp>
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
