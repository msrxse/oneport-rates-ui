import { useState } from 'react'

import Article from '@/components/Article/Article'
import List from '@/components/List/List'
import { Match } from '@/types/matches'

import styles from './Matches.module.css'

export const Matches = () => {
  const [selected, setSelected] = useState<Match>()
  const onUserClick = (selected: Match) => {
    setSelected(selected)
  }
  return (
    <div className={styles.matches}>
      <List setSelected={onUserClick} />
      <Article selected={selected} />
    </div>
  )
}

export default Matches
