import { useMutation } from "@tanstack/react-query"
import { REACT_QUERY_KEYS } from "./keys"
import axios from "axios"


export interface BoundingBoxes {
  topLeftX: number,
  topLeftY: number,
  width: number,
  height: number
}

interface IAnnotation {
  imageId: number,
  annotations: {
      categoryId: number,
      boundingBoxes: BoundingBoxes[]
  }[]
}

export const useMutationAnnotationQuery =()=> {
  return useMutation({
    mutationFn: async(payload: IAnnotation)=> {
     await axios.post('https://eb1b6f8bfab448df91c68bd442d6a968.api.mockbin.io/annotations', {
      payload
     })
    },
    mutationKey: [REACT_QUERY_KEYS.ANNOTATION] 
  })
}
