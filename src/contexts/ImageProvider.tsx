import { useEffect, useState, type PropsWithChildren } from 'react'
import ImageContext from '@/contexts/useImage'
import useImage from '@/hooks/useImage'

const ImageProvider = ({ children }: PropsWithChildren) => {
  const [image, setImage] = useState<File | undefined>(undefined)
  const [imageBase64, setImageBase64] = useState<string>('')
  const { useUploadImageQuery } = useImage()
  const uploadImage = useUploadImageQuery(image)

  useEffect(() => {
    if (image) {
      const reader = new FileReader()
      reader.onload = () => setImageBase64(reader.result as string)
      reader.onerror = () => {}
      reader.readAsDataURL(image)
    } else {
      setImageBase64('')
    }
  }, [image])

  return (
    <ImageContext.Provider
      value={{
        image,
        imageBase64,
        query: uploadImage,
        setImage,
      }}
    >
      {children}
    </ImageContext.Provider>
  )
}

export default ImageProvider
