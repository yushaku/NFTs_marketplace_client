import { NFTMetadata } from '@thirdweb-dev/sdk'

type Props = React.VideoHTMLAttributes<HTMLVideoElement> & {
  metadata: NFTMetadata
  isOn: boolean
}

export const Nftmedia = ({ metadata, isOn }: Props) => {
  const url = metadata?.image || '/img.svg'
  const type = url?.split('.')?.at(-1)

  if (!metadata || !type) return <span />

  console.log({
    url,
    type
  })

  switch (type) {
    case 'mp4':
      return (
        <video
          className="animate size-full group-hover:scale-110"
          src={url}
          autoPlay={isOn}
          loop={isOn}
          muted={isOn}
        />
      )

    case 'gif':
    case 'webp':
    case 'jpg':
    case 'png':
    case 'jpeg':
    case 'svg':
    default:
      return (
        <img
          className="animate size-full group-hover:scale-110"
          loading="lazy"
          src={url}
        />
      )
  }
}

// <video
//   className="animate group-hover:scale-110"
//   src={`${GATEWAY_URL}${item.url}`}
//   width="100%"
// />
