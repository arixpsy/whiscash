import { SignOutButton, useUser } from '@clerk/clerk-react'
import { TbArrowBackUp } from 'react-icons/tb'
import { useNavigate } from 'react-router'
import { Page } from '@/components/commons'
import { Route } from '@/utils/constants/routes'

const Settings = () => {
  const navigate = useNavigate()
  const { user } = useUser()

  const handleClickBack = () => navigate(Route.DASHBOARD)

  return (
    <Page className="flex flex-col">
      <div className="p-3">
        <button type="button" onClick={handleClickBack}>
          <TbArrowBackUp className="h-6 w-6" />
        </button>

        <div className="mt-9 grid place-items-center gap-1">
          <img
            src={user?.imageUrl}
            className="h-20 w-20 rounded-full"
            alt="profile avatar"
          />
          <div className="text-center">
            <p>{user?.fullName}</p>
            <p className="text-sm text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
            <p className="text-sm text-gray-500">
              Local TZ: {Intl.DateTimeFormat().resolvedOptions().timeZone}
            </p>
          </div>
        </div>

        <SignOutButton>
          <div className="mt-6 rounded-lg bg-gray-100 px-3 py-2 text-center">
            Logout
          </div>
        </SignOutButton>
      </div>
    </Page>
  )
}

export default Settings
