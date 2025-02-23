import { Currency, getAllISOCodes, getParamByISO } from 'iso-country-currency'
import { motion, TargetAndTransition } from 'motion/react'
import { useCallback, useMemo, useState } from 'react'
import { Control, useController } from 'react-hook-form'
import { FaQuestionCircle } from 'react-icons/fa'
import { TbArrowBackUp } from 'react-icons/tb'
import { useSearchParams } from 'react-router'
import { useDebounce } from 'use-debounce'
import { CreateWalletRequest } from '@/@types/wallet'
import { Modal, SearchBar } from '@/components/commons'
import 'country-flag-icons/3x2/flags.css'

type CountryCurrencySelectorProps = {
  control: Control<CreateWalletRequest>
}

const CountryCurrencySelector = (props: CountryCurrencySelectorProps) => {
  const { control } = props
  const [searchParam, setSearchParams] = useSearchParams()
  const [searchPhrase, setSearchPhrase] = useState('')
  const [debounceSearchPhrase] = useDebounce(searchPhrase, 250)
  const { field: countryField } = useController({
    name: 'country',
    control,
  })
  const { field: currencyField } = useController({
    name: 'currency',
    control,
  })

  const handleOpenSelector = () => {
    searchParam.append('field', 'currency')
    setSearchParams(searchParam)
  }

  const handleCloseSelector = () => window.history.back()

  const handleSelectOption = useCallback(
    (currency: Currency) => {
      countryField.onChange(currency.iso)
      currencyField.onChange(currency.currency)
      handleCloseSelector()
    },
    [countryField, currencyField]
  )

  const handleModalAnimationComplete = ({
    translateY,
  }: TargetAndTransition) => {
    if (translateY === '100%') setSearchPhrase('')
  }

  const options = useMemo(
    () =>
      getAllISOCodes()
        .filter(
          (option) =>
            option.currency
              .toLowerCase()
              .includes(debounceSearchPhrase.toLowerCase()) ||
            option.countryName
              .toLowerCase()
              .includes(debounceSearchPhrase.toLowerCase())
        )
        .map((option) => (
          <button
            type="button"
            key={option.iso}
            className="flex w-full items-center gap-3"
            onClick={() => handleSelectOption(option)}
          >
            <div className="grid h-12 w-12 place-items-center rounded-full bg-gray-200 p-2">
              <div
                className={`flag:${option.iso}`}
                style={
                  {
                    '--CountryFlagIcon-height': '21.33px',
                  } as React.CSSProperties
                }
              />
            </div>
            <div className="flex w-full justify-between gap-3 pr-3">
              <p className="text-left">{option.countryName}</p>
              <b>{option.currency}</b>
            </div>
          </button>
        )),
    [handleSelectOption, debounceSearchPhrase]
  )

  return (
    <>
      <button
        type="button"
        onClick={handleOpenSelector}
        className="w-full rounded-lg bg-gray-100 px-3 py-2"
      >
        {countryField.value && currencyField.value ? (
          <div className="flex items-center justify-center gap-3">
            <div className={`flag:${countryField.value}`} />
            <p className="max-w-[180px] truncate">
              {getParamByISO(countryField.value, 'countryName')}
            </p>
            <p>{currencyField.value}</p>
          </div>
        ) : (
          'Select'
        )}
      </button>

      <Modal portalKey="field" paramKey="field" paramValue="currency">
        <motion.div
          className="grid h-full w-full max-w-md grid-rows-[auto_1fr] overflow-auto rounded-t-2xl bg-white"
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

            <div className="text-center text-lg font-bold">Select Currency</div>

            <SearchBar className="my-3" setValue={setSearchPhrase} />
          </div>

          <div className="grid h-full auto-rows-min gap-3 overflow-auto pl-3">
            {options.length > 0 ? (
              options
            ) : (
              <div className="flex h-[200px] w-full flex-col items-center justify-center gap-3 text-sm text-gray-500">
                <FaQuestionCircle className="h-16 w-16 text-gray-500" />
                Unable to find country or currency
              </div>
            )}
          </div>
        </motion.div>
      </Modal>
    </>
  )
}

export default CountryCurrencySelector
