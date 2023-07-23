import { useState, useEffect } from 'react'
import Item from './components/Items'
import itemService from './services/items'

const App = () => {
  const [items, setItems] = useState([])

  useEffect(() => {
    itemService.getAll().then(items =>
      setItems( items )
    )  
  }, [])

  return (
    <div>
      <h2>items</h2>
      {items.map(item =>
        <Item key={item.id} item={item} />
      )}
    </div>
  )
}

export default App