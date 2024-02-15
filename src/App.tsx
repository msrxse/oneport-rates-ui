import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import styles from './App.module.css'
import Matches from './components/Matches'

const queryClient = new QueryClient()

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div data-testid="app-id" className={styles.app}>
        <Matches />
      </div>
    </QueryClientProvider>
  )
}

export default App
