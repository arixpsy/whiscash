import { useQuery } from '@tanstack/react-query'
import useToken from '@/hooks/useToken'
import whiscashApi from '@/services/whiscashApi'
import { QUERY_KEYS } from '@/utils/constants/queryKey'

const useImage = () => {
  const { createRequestConfig } = useToken()

  const useUploadImageQuery = (file?: File) =>
    useQuery({
      queryKey: QUERY_KEYS.IMAGE_UPLOAD(file),
      queryFn: () => {
        const formData = new FormData()
        if (file) formData.append('image', file)

        return whiscashApi.getImageTransactionDetails(
          createRequestConfig({
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          })
        )(formData)
      },
      enabled: !!file,
    })

  return {
    useUploadImageQuery,
  }
}

export default useImage
