import { FC } from "react"
import './styles.css'
interface ISearchBar { 
  onSearch: (value: string)=> void
}

const SearchBar: FC<ISearchBar> = ({ onSearch }) => {
  return (
    <div className="search-bar">
      <input onChange={(e)=> onSearch(e.target.value)} type="text" placeholder="Search options..." />
    </div>
  )
}

export default SearchBar