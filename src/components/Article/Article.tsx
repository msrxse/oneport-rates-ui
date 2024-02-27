import { useMatches } from '@/hooks/matches'
import { Match } from '@/types/matches'

import styles from './Article.module.css'

interface ArticleProps {
  selected: Match | undefined
}

export default function Article({ selected }: ArticleProps) {
  const { isPending, error, data } = useMatches()

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  if (!selected) {
    return null
  }

  return (
    <div className={styles.article}>
      <div key={selected.id} className={styles.innerMatches}>
        <h1>{selected.name}</h1>
        <p>{selected.description}</p>
        <strong>👀 {selected.subscribers_count}</strong>{' '}
        <strong>✨ {selected.stargazers_count}</strong> <strong>🍴 {selected.forks_count}</strong>
      </div>
    </div>
  )
}
