import axios from 'axios'
import {REACT_QUERY_KEYS} from './keys'
import { useQuery } from "@tanstack/react-query"


interface ICategory {
  name: string,
  id: number,
}

export const useGetCategoryQuery = () => { 
  return useQuery<ICategory[]>({
    queryFn: async ()=> {
      const { data } = await axios.get('https://f6fe9241e02b404689f62c585d0bd967.api.mockbin.io/categories')
      return data
    },
    queryKey: [REACT_QUERY_KEYS.CATEGORY],
  })
}