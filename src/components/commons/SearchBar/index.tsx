import {
  ChangeEvent,
  Dispatch,
  HTMLAttributes,
  Ref,
  SetStateAction,
} from 'react'
import { FaSearch } from 'react-icons/fa'
import { cn } from '@/utils/functions'

type SearchBarProps = {
  ref?: Ref<HTMLInputElement>
  setValue: Dispatch<SetStateAction<string>>
  placeholder?: string
} & HTMLAttributes<HTMLDivElement>

const SearchBar = (props: SearchBarProps) => {
  const { className, placeholder = 'Search', ref, setValue } = props

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setValue(e.target.value)

  return (
    <div
      className={cn(
        'flex h-10 items-center gap-3 rounded-full bg-gray-100 px-3 text-gray-500',
        className
      )}
    >
      <FaSearch />
      <input
        ref={ref}
        className="w-full outline-none placeholder:text-gray-500"
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  )
}

export default SearchBar
