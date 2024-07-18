import React, { useEffect, useState } from 'react'
import style from './BackdropResume.module.css'
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../hooks/useReduxFunctions';
import { onCloseBackdrop, onOpenModal, onSetForm3 } from '../../store/ui/uiSlice';
import { startCreateTransaction } from '../../store/transactions/thunks';

interface Props {
  // children: React.ReactNode;
  isOpen: boolean;
}

export const BackdropResume = ({ isOpen }: Props) => {

  const dispatch = useAppDispatch()
  const { product } = useAppSelector(state => state.products)
  const { orderDetails, orderFormData } = useAppSelector(state => state.orders)
  const { transactionData } = useAppSelector(state => state.transactions)

  const containerClass = classNames(style['resume-container'], {
    [style['resume-open']]: isOpen,
  });

  const goBack = () => {
    dispatch(onCloseBackdrop())
    dispatch(onOpenModal())
    dispatch(onSetForm3())
  }

  const handlePay = () => {
    const { signature, acceptance_token, ...rest } = transactionData
    dispatch(startCreateTransaction(rest))
  }

  return (
    <section id="resume" className={containerClass}>
      <figure className="flex justify-center mb-2">
        <i className="fa-solid fa-basket-shopping text-6xl"></i>
      </figure>
      <div id="product" className={style['resume-product']}>
        <figure className={style["product-image"]}>
          <img src={import.meta.env.VITE_API_URL_DEV + '/assets/' + product!.image} alt="product-image" />
        </figure>

        <div>
          <p><strong className="font-semibold">{product?.name}</strong></p>
          <p className="paragraph">$ {product!.price * 4000}</p>
        </div>
      </div>

      <p className="paragraph border-b-[1px] border-gray-200 p-1">
        <span className="font-semibold">Location: </span>
        { orderFormData.region + ', ' + orderFormData.city }
      </p>

      <p className="paragraph border-b-[1px] border-gray-200 p-1">
        <span className="font-semibold">Address: </span>
        { orderFormData.address_line_1 + '  ' + orderFormData.address_line_2 }
      </p>

      <p className="paragraph border-b-[1px] border-gray-200 p-1">
        <span className="font-semibold">tax: </span>
        ${ orderDetails.tax }
      </p>

      <p className="paragraph border-b-[1px] border-gray-200 p-1">
        <span className="font-semibold">Shipping: </span>
        ${ orderDetails.shipping }
      </p>

      <div className="flex-1"></div>
      
      <p className="paragraph border-b-[1px] border-gray-200 p-1">
        <span className="font-semibold">Total: </span>
        { orderDetails.subtotal }
      </p>


      <div className="flex justify-between gap-5">
        <button
          className="card-button !flex-1 !w-fit !text-xs mr-auto !mt-10 !py-2 !px-5 cursor-pointer !bg-[#fb3f3f]"
          onClick={goBack}
        >
          Back
        </button>

        <button
          className='card-button !flex-1 !w-fit !text-xs ml-auto !mt-10 !py-2 !px-5 cursor-pointer'
          onClick={handlePay}
        >
          Pay
        </button>
      </div>
    </section>
  )
}
