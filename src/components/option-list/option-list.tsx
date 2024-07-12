import { forwardRef, useImperativeHandle, useState } from "react"
import './styles.css'
interface IOptionList { 
  onSelect: (id: number)=> void
  list: {id: number, name: string}[]
}

export interface OptionsListRef {
  clean(): void
}

const OptionList = forwardRef<OptionsListRef,IOptionList>(({onSelect, list}, ref) => {
  const [selected, setSelected] = useState<null|number>(null)
  const onSelectItem = (id: number)=> { 
    setSelected(id)
    onSelect(id)
  }
  useImperativeHandle(ref,()=> { 
    return { 
      clean(){
        setSelected(null)
      }
    }
  })
  return (
    <ul className="options-list">
      {list?.map((option) => {
        return <li className={option.id === selected ? "highlight" : ''}
          onClick={() => onSelectItem(option.id)}
          key={option.id}>{option.name}
        </li>
      })}
    </ul>
  )
})

export default OptionList