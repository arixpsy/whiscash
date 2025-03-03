import { AiFillInsurance } from 'react-icons/ai'
import { BiHappyBeaming, BiSolidMoviePlay } from 'react-icons/bi'
import { FaBriefcaseMedical, FaCar } from 'react-icons/fa'
import { FaBagShopping, FaGamepad, FaPlaneDeparture } from 'react-icons/fa6'
import { GrStatusUnknown } from 'react-icons/gr'
import { MdFastfood, MdPets, MdWork } from 'react-icons/md'
import { IoFitness, IoGift, IoHammer } from 'react-icons/io5'

export const Category = {
  Entertainment: 'ENTERTAINMENT',
  Fitness: 'FITNESS',
  Food: 'FOOD',
  Games: 'GAMES',
  Gifts: 'GIFTS',
  Hobbies: 'HOBBIES',
  Insurance: 'INSURANCE',
  Medical: 'MEDICAL',
  Others: 'OTHERS',
  Pet: 'PET',
  Shopping: 'SHOPPING',
  Transport: 'TRANSPORT',
  Travel: 'TRAVEL',
  Utilities: 'UTILITIES',
  Work: 'WORK',
} as const

export type Category = (typeof Category)[keyof typeof Category]

export const CATEGORY_ICON = {
  [Category.Entertainment]: BiSolidMoviePlay,
  [Category.Fitness]: IoFitness,
  [Category.Food]: MdFastfood,
  [Category.Games]: FaGamepad,
  [Category.Gifts]: IoGift,
  [Category.Hobbies]: BiHappyBeaming,
  [Category.Insurance]: AiFillInsurance,
  [Category.Medical]: FaBriefcaseMedical,
  [Category.Others]: GrStatusUnknown,
  [Category.Pet]: MdPets,
  [Category.Shopping]: FaBagShopping,
  [Category.Transport]: FaCar,
  [Category.Travel]: FaPlaneDeparture,
  [Category.Utilities]: IoHammer,
  [Category.Work]: MdWork,
}
