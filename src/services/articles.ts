import axios from 'axios'

import { Article } from '@/types/article'

export const getArticles = async () => {
  const response = await axios.get<Article[]>('/articles')
  return response?.data
}
