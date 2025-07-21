import { useEffect, useState, type PropsWithChildren } from 'react'
import ImageContext from '@/contexts/useImage'
import useImage from '@/hooks/useImage'
import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const ImageProvider = ({ children }: PropsWithChildren) => {
  const queryClient = useQueryClient()
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
      queryClient.removeQueries({ queryKey: QUERY_KEYS.IMAGE_UPLOAD })
    }
  }, [image, queryClient])

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
