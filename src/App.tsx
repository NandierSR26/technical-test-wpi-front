import { useEffect, useMemo, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages'
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
    </Routes>
  )
}

export default App
