import { createContext } from 'react'

type ImageContext = {
  image?: string
  setImage: (s?: string) => void
}

const ImageContext = createContext<ImageContext>({
  image: undefined,
  setImage: () => {},
})

export default ImageContext
