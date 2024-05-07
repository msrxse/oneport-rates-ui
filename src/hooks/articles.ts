import { useQuery } from '@tanstack/react-query'

import { getArticles } from '@/services/articles'

export const useArticles = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: getArticles,
  })
}
