import React, { useEffect } from 'react'
import style from './Product.module.css'
import { BackdropResume, Form1, Form2, Form3, Header, Loader, TransactionModal } from '../../components'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxFunctions'
import { startGetProductById } from '../../store/products/thunks'
import { onOpenModal } from '../../store/ui/uiSlice'

export const Product = () => {

  const { id } = useParams()
  const dispatch = useAppDispatch();
  const { isFetching: isFetchingProducts, product } = useAppSelector(state => state.products)
  const { modalIsOpen, form1Visible, form2Visible, form3Visible, backdropIsOpen } = useAppSelector(state => state.ui)
  const { isFetching: isFetchingTransactions } = useAppSelector(state => state.transactions)


  useEffect(() => {
    dispatch(startGetProductById(id!))
  }, [id])

  const handlePayWithCard = () => {
    dispatch(onOpenModal())
  }

  if (isFetchingProducts || !product || isFetchingTransactions) return <Loader />

  return (
    <div className="relative">
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
            <h4 className="subtitle font-semibold text-gray-800 mb-3">{product.name}</h4>
            <p className="paragraph text-gray-500 mb-3">{product.description}</p>
            <p className="paragraph mb-3">
              <span className="font-semibold">Price: </span>
              {product.price * 4000}
            </p>

            <p className="paragraph mb-5">
              <span className="font-semibold">stock: </span>
              {product.stock}
            </p>

            <button className="card-button" onClick={handlePayWithCard}>
              <span className='mr-3'>Pay with card</span>
              <i className="fa-solid fa-credit-card"></i>
            </button>
          </div>

        </section>
      </main>

      <TransactionModal isOpen={modalIsOpen}>
        {form1Visible && <Form1 />}
        {form2Visible && <Form2 />}
        {form3Visible && <Form3 />}
        <BackdropResume isOpen={backdropIsOpen} />
      </TransactionModal>

    </div>
  )
}
