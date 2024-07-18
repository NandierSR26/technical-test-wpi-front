import React from 'react'
import { Header, Loader, ProductsGrid } from '../../components';
import { useAppSelector } from '../../hooks/useReduxFunctions';

export const Home = () => {
  
  const { isFetching, products } = useAppSelector(state => state.products)

  if(isFetching || !products) return <Loader />

  return (
    <div>
      <Header />
      <main>
        <ProductsGrid products={products} />
      </main>
    </div>
  )
}
