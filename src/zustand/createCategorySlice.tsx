
import { create } from 'zustand'

interface ICategory {
  name: string,
  id: number,
}

interface CategorySlice { 
  category: { 
    list: ICategory[],
    searchList: ICategory[],
    onSearch: (value: string) => void,
    onSetCategory: (categories: ICategory[]) => void 
  }
}

export const createCategorySlice = create<CategorySlice>()( set => ({
  category: {
    list: [],
    searchList: [],
    onSetCategory: (value) => set(state=> ({
      category: {
        ...state.category,
        list: value,
        searchList: value,

      }
    })),
    onSearch: (value) => set(state=>({
       category: {
        ...state.category,
        searchList:state.category.list.filter(category => category.name.toLowerCase().includes(value)),
       }
    }))
  }
}))