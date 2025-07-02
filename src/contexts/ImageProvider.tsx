import { useState, type PropsWithChildren } from 'react'
import ImageContext from '@/contexts/useImage'

const ImageProvider = ({ children }: PropsWithChildren) => {
  const [image, setImage] = useState<string | undefined>(undefined)

  return (
    <ImageContext.Provider
      value={{
        image,
        setImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export default ImageProvider
