import React, { useEffect } from 'react'
import style from './Product.module.css'
import { Header } from '../../components'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxFunctions'
import { startGetProductById } from '../../store/products/thunks'

export const Product = () => {

  const { id } = useParams()
  const dispatch = useAppDispatch();
  const { isFetching, product } = useAppSelector(state => state.products)

  useEffect(() => {
    dispatch(startGetProductById(id!))
  }, [id])

  if (isFetching || !product) return <h1>Cargando ...</h1>

  return (
    <>
      <Header />

      <main>
        <section className="style['main-page-container']">
          <figure>
            <img
              src={import.meta.env.VITE_API_URL_DEV + '/assets/' + product.image}
              alt="product-image"
            />
          </figure>

          <div className={style['product-info']}>
            <h4 className="subtitle font-semibold text-gray-800 mb-3">{ product.name }</h4>
            <p className="paragraph text-gray-500 mb-3">{ product.description }</p>
            <p className="paragraph mb-3">
              <span className="font-semibold">Price: </span>
              { product.price*4000 }
            </p>

            <p className="paragraph mb-5">
              <span className="font-semibold">stock: </span>
              { product.stock }
            </p>

            <button className="card-button">
              <span className='mr-3'>Pagar con Tarjeta</span>
              <i className="fa-solid fa-credit-card"></i>
            </button>
          </div>

        </section>
      </main>
    </>
  )
}
