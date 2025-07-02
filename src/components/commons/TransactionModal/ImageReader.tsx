import { use, useEffect } from 'react'
import { motion } from 'motion/react'
import { UseFormReset } from 'react-hook-form'
import { TbArrowBackUp } from 'react-icons/tb'
import Modal from '@/components/commons/Modal'
import { CreateTransactionRequest } from '@/@types/shared'
import ImageContext from '@/contexts/useImage'
import { useNavigate, useSearchParams } from 'react-router'
import { Route } from '@/utils/constants/routes'

type ImageReaderProps = {
  reset: UseFormReset<CreateTransactionRequest>
}

const ImageReader = (props: ImageReaderProps) => {
  const { reset } = props
  const { image, setImage } = use(ImageContext)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const handleClose = () => window.history.back()

  useEffect(() => {
    if (image) {
      console.log('run api call')
    }
  }, [image])

  const handleAutocomplete = () => {
    reset({ amount: 20, category: 'INSURANCE', description: 'Hello testing' }, { keepDefaultValues: true })

    setImage(undefined)

    searchParams.delete('field')
    navigate(Route.DASHBOARD + '?' + searchParams.toString(), {
      replace: true,
    })
  }

  return (
    <Modal
      portalKey="field"
      paramKey="field"
      paramValue="image"
      withoutBackground
    >
      <motion.div
        className="grid-stack h-full w-full overflow-auto rounded-t-2xl bg-white"
        initial={{ translateY: '100%' }}
        animate={{ translateY: '0%' }}
        exit={{ translateY: '100%' }}
        transition={{ type: 'tween', ease: 'easeOut' }}
      >
        {image ? (
          <div
            style={{ backgroundImage: `url('${image}')` }}
            className="h-full w-full bg-contain bg-no-repeat"
          />
        ) : undefined}

        <div className="flex justify-between p-3">
          <button type="button" onClick={handleClose}>
            <TbArrowBackUp className="h-6 w-6" />
          </button>

          <button onClick={handleAutocomplete}>Fill</button>
        </div>
      </motion.div>
    </Modal>
  )
}

export default ImageReader
