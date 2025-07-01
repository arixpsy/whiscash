import { useState } from 'react'
import { motion } from 'motion/react'
import { TbArrowBackUp } from 'react-icons/tb'
import { FaCamera } from 'react-icons/fa6'
import Modal from '@/components/commons/Modal'

const Camera = () => {
  const [displayImage, setDisplayImage] = useState('')

  const handleClose = () => window.history.back()

  const handleFileOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setDisplayImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAutoClick = (input: HTMLInputElement | null) => {
    input?.click()
  }

  return (
    <Modal
      portalKey="field"
      paramKey="field"
      paramValue="camera"
      withoutBackground
    >
      <motion.div
        className="grid-stack h-full w-full overflow-auto rounded-t-2xl bg-white"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        <div className="grid grid-rows-[auto_1fr] p-3">
          <button type="button" onClick={handleClose}>
            <TbArrowBackUp className="h-6 w-6" />
          </button>

          <div className="grid-stack place-items-center">
            <label
              htmlFor="camera"
              className="bg-primary-500 flex aspect-square flex-col items-center justify-center gap-3 rounded-lg p-6 text-white"
            >
              <FaCamera className="h-12 w-12" />
              Take a photo
            </label>
            <input
              ref={handleAutoClick}
              id="camera"
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleFileOnChange}
            />
          </div>
        </div>

        {displayImage ? (
          <div
            style={{ backgroundImage: `url('${displayImage}')` }}
            className="h-full w-full bg-contain bg-no-repeat"
            onClick={() => setDisplayImage('')}
          />
        ) : undefined}
      </motion.div>
    </Modal>
  )
}

export default Camera
