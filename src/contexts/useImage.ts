import { GetImageTransactionDetailsResponse } from '@/@types/shared'
import { UseQueryResult } from '@tanstack/react-query'
import { createContext } from 'react'

type ImageContext = {
  image?: File
  imageBase64: string
  query?: UseQueryResult<GetImageTransactionDetailsResponse>
  setImage: (file?: File) => void
}

const ImageContext = createContext<ImageContext>({
  image: undefined,
  imageBase64: '',
  query: undefined,
  setImage: () => {},
})

export default ImageContext
