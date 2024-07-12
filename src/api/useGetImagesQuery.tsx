import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import {ReactQueryKeys} from './keys';

interface IImage {
  url: string;
  id: number;
}

export const useGetImageQuery = () => {
  return useQuery<IImage[]>({
    queryFn: async () => {
      const {data} = await axios.get(
        'https://5f2f729312b1481b9b1b4eb9d00bc455.api.mockbin.io/unanalyzed-images',
      );
      return data;
    },
    queryKey: [ReactQueryKeys.IMAGES],
  });
};
