import { useState } from 'react'

import Article from '@/components/Article/Article'
import List from '@/components/List/List'
import { Article as ArticleProps } from '@/types/article'

import styles from './Articles.module.css'

export const Articles = () => {
  const [selected, setSelected] = useState<ArticleProps>()
  const onUserClick = (selected: ArticleProps) => {
    setSelected(selected)
  }
  return (
    <div className={styles.articles}>
      <List setSelected={onUserClick} />
      <Article selected={selected} />
    </div>
  )
}

export default Articles
