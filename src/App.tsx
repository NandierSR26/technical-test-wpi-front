import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, Product } from './pages'
import { useAppDispatch } from './hooks/useReduxFunctions'
import { startGetProducts } from './store/products/thunks'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch( startGetProducts() )
  }, [])

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product/:id' element={<Product />} />
    </Routes>
  )
}

export default App
