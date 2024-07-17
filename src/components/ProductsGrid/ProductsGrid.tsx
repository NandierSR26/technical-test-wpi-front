import React from 'react'
import style from './ProductsGrid.module.css'
import { IProductDataResponse } from '../../interfaces'
import { ProductCard } from '../ProductCard'

interface ProductsGridProps {
  products: IProductDataResponse[]
}

export const ProductsGrid = ({ products }: ProductsGridProps) => {
  return (
    <section className={style['main-content-grid']}>
      {
        products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      }
    </section>
  )
}
