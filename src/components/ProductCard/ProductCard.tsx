import React from 'react'
import { IProductDataResponse } from '../../interfaces'
import style from './ProductCard.module.css'
import { useNavigate } from 'react-router-dom'

interface ProductCardProps {
  product: IProductDataResponse
}

export const ProductCard = ({ product }: ProductCardProps) => {

  const navigate = useNavigate()

  return (
    <div className={style['product-card-container']}>
      <figure className={style['card-image']}>
        <img
          src={import.meta.env.VITE_API_URL_DEV + '/assets/' + product.image}
          alt="product-image"
        />
      </figure>

      <div className={style['card-body']}>
        <div className="flex justify-between items-center mb-3">
          <h4 className="subtitle font-semibold text-gray-800">{product.name}</h4>
          <span className="paragraph font-semibold">$: {(product.price*4000)}</span>
        </div>

        <p className="paragraph text-gray-500">{product.description.substring(0, 100) + ' ...'}</p>

        <button 
          className={'card-button'}
          onClick={() => navigate(`/product/${product.id}`)}
        >
          Ver más
        </button>
      </div>
    </div>
  )
}
