import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Articles from '@/scenes/Articles/Articles'

import styles from './App.module.css'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <main data-testid="app-id" className={styles.main}>
        <Articles />
      </main>
    </QueryClientProvider>
  )
}

export default App
