import { ClerkProvider } from '@clerk/clerk-react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import { ActionBarLayout } from '@/components/commons'
import { Dashboard, Login, Wallets } from '@/pages'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env.local file')
}

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={client}>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <Routes>
            <Route index element={<Login />} />
            <Route element={<ActionBarLayout />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="history" element={<div>history</div>} />
              <Route path="wallets" element={<Wallets />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClerkProvider>
    </QueryClientProvider>
  </StrictMode>
)
