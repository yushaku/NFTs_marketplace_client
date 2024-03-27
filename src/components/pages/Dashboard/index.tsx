import { ERC20_ABI } from '@/abi/erc20.ts'
import { stakeModuleABI } from '@/abi/stakeModule.ts'
import { USDT } from '@/components/icons'
import { STAKE_ADRESS, TOKEN_GOVERNANCE, shortenAddress } from '@/utils'
import { useState } from 'react'
import { formatEther } from 'viem'
import { useAccount, useEnsName, useReadContract } from 'wagmi'
import { StakeForm } from './stakeForm'
import { NativeBalance } from '@/components/common/NativeTokenBalance'

export const Dashboard = () => {
  const [openModal, setOpenModal] = useState({
    stake: false,
    claim: false
  })

  const { address } = useAccount()
  const ens = useEnsName({ address: address })

  const yskRes = useReadContract({
    abi: ERC20_ABI,
    address: TOKEN_GOVERNANCE,
    functionName: 'balanceOf',
    args: [address ?? '0x0']
  })
  const yuBalance = formatEther(yskRes?.data ?? 0n)

  const totalStaked = useReadContract({
    abi: stakeModuleABI,
    address: STAKE_ADRESS,
    functionName: 'totalStakedAmount'
  })

  return (
    <>
      <h3 className="flex items-center gap-3 text-lg text-gray-400">
        <span>{ens?.data ? ens.data : shortenAddress(address)}:</span>
        <NativeBalance address={address} />
      </h3>

      <section className="mt-10 flex gap-10">
        <div className="h-fit w-1/2 rounded-xl bg-layer p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <img className="size-10" src="/logo.png" alt="logo" /> YSK
          </h3>

          <article className="mt-5 flex justify-between">
            <p className="text-center">
              <span className="block text-sm text-gray-400">
                you are staking:
              </span>
              <strong className="inline-flex items-center gap-2 text-xl font-bold">
                0
                <img className="size-7" src="/logo.png" alt="logo" />
              </strong>
            </p>
            <p className="text-center">
              <span className="block text-sm text-gray-400">Your Balance</span>
              <strong className="flex items-center gap-2 text-xl font-bold">
                {yuBalance}
                <img className="size-7" src="/logo.png" alt="logo" />
              </strong>
            </p>
          </article>

          <article className="mt-10 flex justify-between">
            <p>
              <span className="block text-sm text-gray-400">XVS Stake APR</span>
              <strong className="text-xl font-bold">8.31%</strong>
            </p>

            <p>
              <span className="block text-sm text-gray-400">
                Daily Emission
              </span>
              <strong className="flex-start gap-2 text-xl font-bold">
                <img className="size-7" src="/logo.png" alt="logo" />
                1.672k
              </strong>
            </p>

            <p>
              <span className="block text-sm text-gray-400">Total Staked</span>
              <strong className="flex-start gap-2 text-xl font-bold">
                <img className="size-7" src="/logo.png" alt="logo" />
                {formatEther(totalStaked?.data ?? 0n)}
              </strong>
            </p>
          </article>

          <article className="mt-10 flex gap-5">
            <button
              onClick={() => setOpenModal({ ...openModal, stake: true })}
              className="btn btn-solid w-1/2"
            >
              Stake
            </button>
            <button
              onClick={() => setOpenModal({ ...openModal, claim: true })}
              className="btn btn-outline w-1/2"
            >
              Claim
            </button>
          </article>
        </div>

        <div className="h-fit w-1/2 rounded-xl bg-layer p-5">
          <h3 className="flex items-center gap-2 text-xl font-bold">
            <USDT className="inline-block size-9" />
            USDT
          </h3>

          <article className="mt-5 flex justify-between">
            <p className="text-center">
              <span className="block text-sm text-gray-400">
                you are staking:
              </span>
              <strong className="text-xl font-bold">0</strong>
            </p>
            <p>
              <span className="block text-sm text-gray-400">Your Balance</span>
              <strong className="text-xl font-bold">0</strong>
            </p>
          </article>

          <article className="mt-10 flex justify-between">
            <p className="text-center">
              <span className="block text-sm text-gray-400">XVS Stake APR</span>
              <strong className="text-xl font-bold">15.1%</strong>
            </p>

            <p>
              <span className="block text-sm text-gray-400">
                Daily Emission
              </span>
              <strong className="flex-start gap-2 text-xl font-bold">
                <img className="size-7" src="/logo.png" alt="logo" />
                125.000
              </strong>
            </p>

            <p>
              <span className="block text-sm text-gray-400">Total Staked</span>
              <strong className="flex-start gap-2 text-xl font-bold">
                <USDT className="inline-block size-6" />
                2.68M
              </strong>
            </p>
          </article>

          <article className="mt-10 flex gap-5">
            <button className="btn btn-solid w-1/2">Stake</button>
            <button className="btn btn-outline w-1/2">Claim</button>
          </article>
        </div>
      </section>

      <StakeForm
        isOpen={openModal.stake}
        setOpen={() => setOpenModal({ ...openModal, stake: false })}
        accountBalance={yuBalance}
      />
    </>
  )
}
