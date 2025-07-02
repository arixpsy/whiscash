import { RefObject } from 'react'
import { FaCamera } from 'react-icons/fa6'

type CameraProps = {
  ref: RefObject<HTMLInputElement | null>
} & React.HTMLAttributes<HTMLDivElement>

const Camera = (props: CameraProps) => {
  const { ref } = props
  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        if (reader.result) console.log(reader.result as string)
      }
      reader.readAsDataURL(file)
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
