import { use } from 'react'
import { motion } from 'motion/react'
import { UseFormReset } from 'react-hook-form'
import { FaCheck, FaTimes } from 'react-icons/fa'
import {
  CreateTransactionRequest,
  GetImageTransactionDetailsResponse,
} from '@/@types/shared'
import { FeedbackButton, Loader, LoadingDots } from '@/components/commons'
import ImageContext from '@/contexts/useImage'
import { cn } from '@/utils/functions'

type ImageReaderProps = {
  reset: UseFormReset<CreateTransactionRequest>
}

const ImageReader = (props: ImageReaderProps) => {
  const { reset } = props
  const { imageBase64, setImage, query } = use(ImageContext)
  const isAnalyzing = query ? query.isPending : true

  const handleClickContinue = () => {
    reset(
      {
        amount: 1,
        ...(query && query.data ? query.data : {}),
      },
      {
        keepDefaultValues: true,
      }
    )
    setImage(undefined)
  }

  const queryResults = (key: keyof GetImageTransactionDetailsResponse) =>
    isAnalyzing ? (
      <Loader size="xxs" className="self-center" />
    ) : query?.data?.[key] ? (
      <FaCheck className="h-3 w-3 self-center text-green-500" />
    ) : (
      <FaTimes className="h-3 w-3 self-center text-red-400" />
    )

  return (
    <motion.div
      initial={{ translateY: '100%' }}
      animate={{ translateY: '0%' }}
      exit={{ translateY: '100%' }}
      transition={{ type: 'tween', ease: 'easeOut' }}
      className="absolute inset-0 flex flex-col items-center justify-center rounded-t-2xl bg-white p-3"
    >
      <p className="mb-6 text-4xl font-bold">Analyzing Image</p>

      <div
        className={cn(
          'h-[250px] w-[250px] rounded-2xl bg-gray-200 bg-cover bg-center bg-no-repeat',
          !imageBase64 && 'animate-pulse'
        )}
        style={{ backgroundImage: `url(${imageBase64})` }}
      />

      <div className="mt-6 grid w-[150px] grid-cols-[1fr_auto]">
        <p>Amount</p>
        {queryResults('amount')}
        <p>Description</p>
        {queryResults('description')}
        <p>Category</p>
        {queryResults('category')}
        <p>Paid Date</p>
        {queryResults('paidAt')}
      </div>

      <FeedbackButton
        onClick={handleClickContinue}
        className="bg-primary-500 mt-6 w-full max-w-[300px] rounded-full p-2 text-white transition-transform active:scale-105"
        disabled={isAnalyzing}
      >
        {isAnalyzing ? <LoadingDots /> : 'Continue'}
      </FeedbackButton>
    </motion.div>
  )
}

export default ImageReader
