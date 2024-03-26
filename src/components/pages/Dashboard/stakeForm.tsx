import ModalWarp from '@/components/common/ModalWarper'
import { STAKE_ADRESS } from '@/utils'
import { yupResolver } from '@hookform/resolvers/yup'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { stakeModuleABI } from '@/abi/stakeModule'
import {
  useWaitForTransactionReceipt as useWaitTx,
  useWriteContract
} from 'wagmi'
import * as yup from 'yup'
import { parseUnits } from 'viem'

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

    // sendTransaction({
    //   to: '0x714d8c3543Da840d0aE23E7a8A1efFFC06Ad05b8',
    //   value: parseEther('0.01')
    // })

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

          <label className="relative">
            <input
              type="text"
              placeholder="Amount"
              className={`w-full p-3 bg-layer rounded-lg border  focus:border-gray-500 focus:outline-none focus:ring-gray-500 ${errors.amount?.message ? 'border-red-400' : 'border-gray-700'}`}
              {...register('amount', { required: true })}
            />
            <span
              onClick={() => setValue('amount', Number(accountBalance))}
              className="text-accent cursor-pointer absolute top-3 right-5"
            >
              Max
            </span>
          </label>
          <p>
            your balance: {accountBalance}
            <img
              className="size-8 inline-block ml-2"
              src="/logo.png"
              alt="logo"
            />
          </p>

          <input
            type="submit"
            value={isPending ? 'Pending...' : 'Stake'}
            disabled={isPending}
            className="cursor-pointer mt-5 w-full p-3 bg-accent rounded-lg hover:bg-lighterAccent"
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
