import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Matches from '@/scenes/Matches/Matches'

import styles from './App.module.css'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main data-testid="app-id" className={styles.main}>
        <Matches />
      </main>
    </QueryClientProvider>
  )
}

export default App
