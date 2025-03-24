import { motion } from 'motion/react'
import { FeedbackButton, Loader } from '@/components/commons'
import { cn } from '@/utils/functions'

type ArchiveBannerProps = {
  onClickRevert: () => void
  isLoading: boolean
}

const ArchiveBanner = (props: ArchiveBannerProps) => {
  const { isLoading, onClickRevert } = props

  return (
    <motion.div
      className="absolute right-0 bottom-0 left-0 flex items-center justify-center gap-3 bg-gray-600 py-3 text-center text-sm text-white"
      initial={{ translateY: '100%' }}
      animate={{ translateY: '0%' }}
      exit={{ translateY: '100%' }}
      transition={{ type: 'tween', ease: 'easeOut', delay: 0.3 }}
    >
      This wallet is archived
      <FeedbackButton
        onClick={onClickRevert}
        type="button"
        className="bg-primary-500 grid-stack place-items-center rounded px-3 py-0.5 text-white"
      >
        <Loader
          size="xxs"
          color="white"
          className={cn(!isLoading && 'invisible')}
        />
        <p className={cn(isLoading && 'invisible')}>Revert</p>
      </FeedbackButton>
    </motion.div>
  )
}

export default ArchiveBanner
