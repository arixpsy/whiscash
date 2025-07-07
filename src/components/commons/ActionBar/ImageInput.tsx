import { RefObject, use } from 'react'
import { FaCamera, FaImage } from 'react-icons/fa6'
import { useLocation, useSearchParams } from 'react-router'
import ImageContext from '@/contexts/useImage'

type ImageInputProps = {
  source?: 'camera' | 'gallery'
  ref: RefObject<HTMLInputElement | null>
} & React.HTMLAttributes<HTMLDivElement>

const ImageInput = (props: ImageInputProps) => {
  const { ref, source = 'camera' } = props
  const { setImage } = use(ImageContext)
  const [, setSearchParams] = useSearchParams()
  const pathname = useLocation()

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setSearchParams({ create: 'transaction' }, { state: { from: pathname } })
      e.target.value = ''
    }
  }

  return (
    <div className="grid h-6 w-6 place-items-center">
      {source === 'camera' ? (
        <FaCamera className="h-5 w-5" />
      ) : (
        <FaImage className="h-5 w-5" />
      )}
      <input
        ref={ref}
        type="file"
        accept="image/*"
        capture={source === 'camera' ? 'environment' : undefined}
        className="hidden"
        onChange={handleFileOnChange}
      />
    </div>
  )
}

export default ImageInput
