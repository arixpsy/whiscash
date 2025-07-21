import { motion, TargetAndTransition } from 'motion/react'
import { createElement, useMemo, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { TbArrowBackUp } from 'react-icons/tb'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'use-debounce'
import { CreateTransactionRequest } from '@/@types/shared'
import { Banner, Modal, SearchBar } from '@/components/commons'
import { CATEGORY_ICON } from '@/utils/constants/categories'
import { Category } from '@/utils/enum'

type CategorySelectorProps = {
  control: Control<CreateTransactionRequest>
}

const CategorySelector = (props: CategorySelectorProps) => {
  const { control } = props
  const [searchParam, setSearchParams] = useSearchParams()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const { field: categoryField } = useController({
    name: 'category',
    control,
  })

  const options = useMemo(
    () =>
      Object.values(Category).filter((option) =>
        option.toLowerCase().includes(debounceSearchPhrase.toLowerCase())
      ),
    [debounceSearchPhrase]
  )

  const handleOpenSelector = () => {
    searchParam.append('field', 'category')
    setSearchParams(searchParam)
  }

  const handleCloseSelector = () => window.history.back()

  const handleClickOption = (cat: Category) => {
    categoryField.onChange(cat)
    handleCloseSelector()
  }

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '100%') setSearchPhrase('')
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenSelector}
        className="w-full rounded-lg bg-gray-100 px-3 py-2"
      >
        {categoryField.value ? (
          <div className="flex items-center justify-center gap-2">
            <div className="bg-primary-100 grid h-6 w-6 place-items-center rounded-lg">
              {createElement(CATEGORY_ICON[categoryField.value], {
                className: 'text-primary-500 h-3 w-3',
              })}
            </div>
            <p className="capitalize">{categoryField.value.toLowerCase()}</p>
          </div>
        ) : (
          'Select'
        )}
      </button>

      <Modal
        portalKey="field"
        paramKey="field"
        paramValue="category"
        withoutBackground
      >
        <motion.div
          className="grid h-full w-full grid-rows-[auto_1fr] overflow-auto rounded-t-2xl bg-white"
          initial={{ translateY: '100%' }}
          animate={{ translateY: '0%' }}
          exit={{ translateY: '100%' }}
          transition={{ type: 'tween', ease: 'easeOut' }}
          onAnimationComplete={handleModalAnimationComplete}
        >
          <div className="p-3">
            <button type="button" onClick={handleCloseSelector}>
              <TbArrowBackUp className="h-6 w-6" />
            </button>

            <div className="text-center text-lg font-bold">Select Category</div>

            <SearchBar className="my-3" setValue={setSearchPhrase} />
          </div>

          <div className="grid h-full auto-rows-min gap-3 overflow-auto px-3">
            {options.length > 0 ? (
              options.map((cat) => (
                <button
                  key={cat}
                  className="flex items-center gap-3"
                  type="button"
                  onClick={() => handleClickOption(cat)}
                >
                  <div className="bg-primary-100 grid h-12 w-12 place-items-center rounded-lg">
                    {createElement(CATEGORY_ICON[cat], {
                      className: 'text-primary-500 h-6 w-6',
                    })}
                  </div>
                  <p className="font-bold capitalize">{cat.toLowerCase()}</p>
                </button>
              ))
            ) : (
              <div className="flex h-[200px] w-full items-center justify-center">
                <Banner.NoCategoryFound />
              </div>
            )}
          </div>
        </motion.div>
      </Modal>
    </>
  )
}

export default CategorySelector
