import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxFunctions'
import { Formik } from 'formik'

import * as Yup from 'yup'
import { ShippingAddress } from '../../../interfaces'
import { onCloseModal, onOpenBackdrop, onSetForm2 } from '../../../store/ui/uiSlice'
import { onModelingTransactionData } from '../../../store/transactions/transactionsSlice'
import { onAddOrderDetails, onAddOrderFormData } from '../../../store/orders/ordersSlice'
import { store } from '../../../store'

export const Form3 = () => {
  const dispatch = useAppDispatch()
  const { isFetching: isFetchingTransactions } = useAppSelector(state => state.transactions)
  const { currentCustomer } = useAppSelector(state => state.customers)
  const { product } = useAppSelector(state => state.products)

  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [initialValues, setInitialValues] = useState({
    units: '',
    address_line_1: '',
    address_line_2: '',
    country: '',
    region: '',
    city: '',
    name: currentCustomer?.full_name || '',
    phone_number: currentCustomer?.phone_number || '',
    postal_code: '',
  })

  useEffect(() => {
    if (!localStorage.getItem('shipping-address')) {
      setIsLoading(false)
      return
    }

    setInitialValues(
      JSON.parse(localStorage.getItem('shipping-address')!)
    )
    setIsLoading(false)
  }, [])

  if (isFetchingTransactions || isLoading) return <h1>Cargando..</h1>

  return (
    <div className="form-container">
      <h2 className="font-semibold text-gray-800 mb-7 text-center text-xl">Order information</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          units: Yup.number().max(product!.stock, `There are only ${product?.stock} units in stock`).required('required'),
          address_line_1: Yup.string().required('Required'),
          address_line_2: Yup.string().required('Required'),
          country: Yup.string().required('Required'),
          region: Yup.string().required('Required'),
          city: Yup.string().required('Required'),
          postal_code: Yup.string().required('Required'),
        })}
        onSubmit={(data) => {
          localStorage.setItem('shipping-address', JSON.stringify(data))

          const { units, ...shippingAddress } = data
          const transactionData: ShippingAddress = shippingAddress;
          const productPrice = (+units * product!.price) * 4000
          const tax = productPrice * 0.05
          const shipping = productPrice * 0.05
          const subtotal = (productPrice + shipping + tax)*100

          dispatch(onModelingTransactionData({
            shipping_address: transactionData,
            amount_in_cents: subtotal,
            currency: 'COP',
            redirect_url: `http://localhost:5173/product/${ product?.id }`,
            reference: `${currentCustomer?.full_name}_${product?.name}_${Date.now()}`
          }))

          dispatch(onAddOrderFormData({
            address_line_1: data.address_line_1,
            address_line_2: data.address_line_2,
            country: data.country,
            region: data.region,
            city: data.city,
            postal_code: data.postal_code,
            total: subtotal.toString(),
            product_amount: data.units,
            customer: currentCustomer!.id,
            product: product!.id
          }))

          dispatch(onAddOrderDetails({
            productPrice,
            tax,
            shipping,
            subtotal
          }))

          dispatch(onOpenBackdrop())
        }}
      >
        {({ values, touched, errors, handleChange, handleSubmit }) => (
          <form className="flex flex-col mx-auto max-w-sm" onSubmit={handleSubmit}>
            <input
              type="number"
              name="units"
              placeholder="Product units"
              onChange={handleChange}
              value={values.units}
              className={errors.units && touched.units ? 'input-text input-error' : 'input-text'}
            />
            {(errors.units && touched.units) && <span className="label-input-error">{errors.units}</span>}

            <input
              type="text"
              name="address_line_1"
              placeholder="Address line 1"
              onChange={handleChange}
              value={values.address_line_1}
              className={errors.address_line_1 && touched.address_line_1 ? 'input-text input-error' : 'input-text'}
            />
            {(errors.address_line_1 && touched.address_line_1) && <span className="label-input-error">{errors.address_line_1}</span>}

            <input
              type="text"
              name="address_line_2"
              placeholder="Address line 2"
              onChange={handleChange}
              value={values.address_line_2}
              className={errors.address_line_2 && touched.address_line_2 ? 'input-text input-error' : 'input-text'}
            />
            {(errors.address_line_2 && touched.address_line_2) && <span className="label-input-error">{errors.address_line_2}</span>}

            <select
              name="country"
              className={`
                ${values.country === "" ? "text-[#9CA3AF]" : "text-black"}
                ${errors.country && touched.country ? 'input-text input-error' : 'input-text'}
              `}
              onChange={handleChange}
              value={values.country}
            >
              <option value="">-- country --</option>
              <option value="CO">Colombia</option>
            </select>
            {(errors.country && touched.country) && <span className="label-input-error">{errors.country}</span>}

            <select
              name="region"
              className={`
                ${values.region === "" ? "text-[#9CA3AF]" : "text-black"}
                ${errors.region && touched.region ? 'input-text input-error' : 'input-text'}
              `}
              onChange={handleChange}
              value={values.region}
            >
              <option value="">-- region --</option>
              <option value="Cundinamarca">Cundinamarca</option>
            </select>
            {(errors.region && touched.region) && <span className="label-input-error">{errors.region}</span>}

            <select
              name="city"
              className={`
                ${values.city === "" ? "text-[#9CA3AF]" : "text-black"}
                ${errors.city && touched.city ? 'input-text input-error' : 'input-text'}
              `}
              onChange={handleChange}
              value={values.city}
            >
              <option value="">-- city --</option>
              <option value="Cundinamarca">Cundinamarca</option>
            </select>
            {(errors.city && touched.city) && <span className="label-input-error">{errors.city}</span>}

            <input
              type="text"
              name="postal_code"
              placeholder="Postal Code"
              onChange={handleChange}
              value={values.postal_code}
              className={errors.postal_code && touched.postal_code ? 'input-text input-error' : 'input-text'}
            />
            {(errors.postal_code && touched.postal_code) && <span className="label-input-error">{errors.postal_code}</span>}


            <div className="flex justify-between gap-5">
              <button
                className="card-button !w-fit !text-xs mr-auto !mt-10 !py-2 !px-5 cursor-pointer !bg-[#fb3f3f]"
                onClick={() => dispatch(onSetForm2())}
              >
                Back
              </button>

              <button
                type='submit'
                className='card-button !w-fit !text-xs ml-auto !mt-10 !py-2 !px-5 cursor-pointer'
              >
                Finish
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
