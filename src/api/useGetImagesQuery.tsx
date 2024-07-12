import axios from 'axios'
import {REACT_QUERY_KEYS} from './keys'
import { useQuery } from "@tanstack/react-query"


interface IImage {
  url: string,
  id: number,
}

export const useGetImageQuery = () => { 
  return useQuery<IImage[]>({
    queryFn: async ()=> {
      const { data } = await axios.get('https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images')
      return data
    },
    queryKey: [REACT_QUERY_KEYS.IMAGES],
  })
}