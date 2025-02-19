import { useAuth } from '@clerk/clerk-react'
import { AxiosRequestConfig } from 'axios'
import { useCallback } from 'react'

const useToken = () => {
  const { getToken, isSignedIn } = useAuth()

  const createRequestConfig = useCallback(
    async (config?: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
      const Authorization = isSignedIn ? `Bearer ${await getToken()}` : ''

      return {
        ...config,
        headers: {
          ...config?.headers,
          Authorization,
        },
      }
    },
    [isSignedIn, getToken]
  )

  return {
    createRequestConfig,
  }
}

export default useToken
