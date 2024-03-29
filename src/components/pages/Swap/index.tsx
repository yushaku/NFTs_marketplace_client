import { JSON_RPC, TOKEN_LIST, uniTheme } from '@/utils'
import { SwapWidget } from '@uniswap/widgets'
import { Tab } from './tab'
import { useState } from 'react'
import {
  AdvancedRealTimeChart,
  CryptoCoinsHeatmap,
  FundamentalData,
  TechnicalAnalysis,
  Timeline
} from 'react-ts-tradingview-widgets'
import { useChainId } from 'wagmi'

type Feature = 'chart' | 'analysis' | 'heatmap' | 'bubble' | 'news'
const listFeature: Array<Feature> = [
  'chart',
  'analysis',
  'heatmap',
  'bubble',
  'news'
]

export const Swap = () => {
  const chainId = useChainId()

  const [type, setType] = useState<Feature>('chart')
  const [crypto, setCrypto] = useState<string>('BTCUSD')

  return (
    <section className="">
      <div className="flex w-fit rounded-lg border-4 border-layer bg-layer">
        {listFeature.map((feat) => {
          const pickedStyle = type === feat && 'bg-background'
          return (
            <button
              key={feat}
              className={`${pickedStyle} rounded-lg px-8 py-3 `}
              onClick={() => setType(feat)}
            >
              {feat}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex h-1/2">
        <Tab isOpen={type === 'chart'} className="flex">
          <article className="flex-1">
            <AdvancedRealTimeChart
              symbol={crypto}
              theme="dark"
              range="1D"
              calendar={false}
              hide_top_toolbar={false}
              hide_legend={true}
              withdateranges={false}
              autosize
            ></AdvancedRealTimeChart>
          </article>

          <article className="grid gap-3">
            <SwapWidget
              theme={uniTheme}
              onTokenChange={(e) => console.log(JSON.stringify(e))}
              hideConnectionUI={true}
              // provider={provider}
              tokenList={TOKEN_LIST}
              jsonRpcUrlMap={JSON_RPC}
              defaultChainId={chainId}
              // defaultInputAmount="1"
              defaultInputTokenAddress="NATIVE"
              // defaultOutputTokenAddress={UNI}
            />

            <Timeline
              colorTheme="dark"
              feedMode="market"
              market="crypto"
              height={400}
              width="100%"
            />
          </article>
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

        <Tab isOpen={type === 'bubble'}>
          <iframe
            src="https://cryptobubbles.net"
            width="100%"
            height="100%"
            loading="lazy"
          ></iframe>
        </Tab>

        <Tab isOpen={type === 'news'}>
          <Timeline
            colorTheme="dark"
            feedMode="market"
            market="crypto"
            height="100%"
            width="100%"
          />
        </Tab>
      </div>
    </section>
  )
}
