import { RefObject, use } from 'react'
import { FaCamera } from 'react-icons/fa6'
import { useLocation, useSearchParams } from 'react-router'
import ImageContext from '@/contexts/useImage'

type CameraProps = {
  ref: RefObject<HTMLInputElement | null>
} & React.HTMLAttributes<HTMLDivElement>

const Camera = (props: CameraProps) => {
  const { ref } = props
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
      <FaCamera className="h-5 w-5" />
      <input
        ref={ref}
        id="camera"
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={handleFileOnChange}
      />
    </div>
  )
}

export default Camera
