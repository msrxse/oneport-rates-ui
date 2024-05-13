import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Rates from '@/scenes/Rates'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="py-14 container">
        <div className="relative">
          <h1 className="text-[40px] satoshi text-custom-black font-medium">Special Rates</h1>
          <Rates />
        </div>
      </div>
    </QueryClientProvider>
  )
}

export default App
