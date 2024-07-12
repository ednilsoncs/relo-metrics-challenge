import {create} from 'zustand';
import {BoundingBoxes} from '../api/useMutationAnnotationQuery';

interface IImage {
  url: string;
  id: number;
}

interface IImageAnalyzed {
  id: number;
  url: string;
  annotations: {
    categoryId: number;
    boundingBoxes: BoundingBoxes[];
  }[];
}

interface ImagesSlice {
  images: {
    list: IImage[];
    analyzedImages: IImageAnalyzed[];
    onMoveToAnalyzedImageList: (image: IImageAnalyzed) => void;
    onSetImages: (images: IImage[]) => void;
  };
}

export const createImagesSlice = create<ImagesSlice>()(set => ({
  images: {
    list: [],
    analyzedImages: [],
    onMoveToAnalyzedImageList: value =>
      set(state => ({
        images: {
          ...state.images,
          list: state.images.list.filter(image => value.id !== image.id),
          analyzedImage: [...state.images.list, value],
        },
      })),
    onSetImages: value =>
      set(state => ({
        images: {
          ...state.images,
          list: value,
        },
      })),
  },
}));
