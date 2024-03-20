import { HTMLAttributes, useState } from 'react'
import {
  AdvancedRealTimeChart,
  TechnicalAnalysis,
  FundamentalData,
  CryptoCoinsHeatmap
} from 'react-ts-tradingview-widgets'
import { useChainId } from 'wagmi'

type Feature = 'chart' | 'analysis' | 'heatmap'
const listFeature: Array<Feature> = ['chart', 'analysis', 'heatmap']

export const Swap = () => {
  const chainId = useChainId()

  const [type, setType] = useState<Feature>('chart')
  const [crypto, setCrypto] = useState<string>('BTCUSD')

  return (
    <section className="">
      <div className="flex bg-layer w-fit rounded-lg border-4 border-layer">
        {listFeature.map((feat) => {
          const pickedStyle = type === feat && 'bg-background'
          return (
            <button
              key={feat}
              className={`${pickedStyle} py-3 px-8 rounded-lg `}
              onClick={() => setType(feat)}
            >
              {feat}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex h-[50%]">
        <Tab isOpen={type === 'chart'}>
          <AdvancedRealTimeChart
            symbol={crypto}
            theme="dark"
            autosize
          ></AdvancedRealTimeChart>

          {/* <SwapWidget */}
          {/*   tokenList={TOKEN_LIST} */}
          {/*   defaultInputAmount="1" */}
          {/*   defaultChainId={chainId} */}
          {/*   defaultOutputTokenAddress={UNI} */}
          {/*   defaultInputTokenAddress="NATIVE" */}
          {/* /> */}
        </Tab>

        <Tab isOpen={type === 'analysis'} className="flex">
          <TechnicalAnalysis
            symbol={crypto}
            colorTheme="dark"
            width="100%"
          ></TechnicalAnalysis>

          <FundamentalData
            symbol={crypto}
            colorTheme="dark"
            width="100%"
          ></FundamentalData>
        </Tab>

        <Tab isOpen={type === 'heatmap'}>
          <CryptoCoinsHeatmap
            width="100%"
            height="100%"
            colorTheme="dark"
          ></CryptoCoinsHeatmap>
        </Tab>
      </div>
    </section>
  )
}

type TabType = HTMLAttributes<HTMLDivElement> & {
  isOpen: boolean
  children: React.ReactNode
}
const Tab = ({ isOpen, children, ...props }: TabType) => {
  const className = props.className
  return (
    <div
      className={`${className} ${
        isOpen ? 'opacity-1 w-full' : 'opacity-0 w-0 overflow-hidden'
      }`}
    >
      {children}
    </div>
  )
}
