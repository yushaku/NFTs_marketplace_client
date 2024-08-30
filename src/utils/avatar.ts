export function getGradientColors(address: string) {
  const seedArr = address.match(/.{1,7}/g)?.splice(0, 5)
  const colors: string[] = []

  seedArr?.forEach((seed) => {
    let hash = 0
    for (let i = 0; i < seed.length; i += 1) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash)
      hash = hash & hash
    }

    const rgb = [0, 0, 0]
    for (let i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 255
      rgb[i] = value
    }
    colors.push(`rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`)
  })

  return colors
}

export function createAvatar(address: string) {
  const colors = getGradientColors(address)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const style = {} as any

  style['borderRadius'] = '50%'
  style['[boxShadow]'] = 'inset 0 0 0 1px rgba(0, 0, 0, 0.1)'
  style['backgroundColor'] = colors[0]
  style['backgroundImage'] = `
    radial-gradient(at 66% 77%, ${colors[1]} 0px, transparent 50%),
    radial-gradient(at 29% 97%, ${colors[2]} 0px, transparent 50%),
    radial-gradient(at 99% 86%, ${colors[3]} 0px, transparent 50%),
    radial-gradient(at 29% 88%, ${colors[4]} 0px, transparent 50%)
  `
  return style
}

export default createAvatar
