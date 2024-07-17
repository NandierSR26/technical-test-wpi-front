import React from 'react'
import { Header, ProductsGrid } from '../../components';
import { useAppSelector } from '../../hooks/useReduxFunctions';

export const Home = () => {
  
  const { isFetching, products } = useAppSelector(state => state.products)

  if(isFetching || !products) return <h1>Cargando...</h1>

  return (
    <div>
      <Header />
      <main>
        <ProductsGrid products={products} />
      </main>
    </div>
  )
}
