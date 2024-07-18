import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ICustomerDataRequest, ITransactionDataRequest } from '../../../interfaces'
import { useAppDispatch } from '../../../hooks/useReduxFunctions'
import { startSaveCustomer } from '../../../store/customers/thunks'
import { onSetForm2 } from '../../../store/ui/uiSlice'
import { onModelingTransactionData, transactionDataInit } from '../../../store/transactions/transactionsSlice'

export const Form1 = () => {

  const [initialValues, setInitialValues] = useState<ICustomerDataRequest>({
    legal_id_type: 'CC',
    legal_id: '',
    full_name: '',
    email: '',
    phone_number: ''
  })
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!localStorage.getItem('customer')) {
      setIsLoading(false)
      return
    };

    setInitialValues(
      JSON.parse(localStorage.getItem('customer')!)
    )
    setIsLoading(false)
  }, [])

  if (isLoading) return <h1>Cargando...</h1>

  return (
    <div className={'form-container'}>
      <h2 className="font-semibold text-gray-800 mb-7 text-center text-xl">Enter your details</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          legal_id_type: Yup.string().required('Required'),
          legal_id: Yup.string().required('Required'),
          full_name: Yup.string().required('Required'),
          email: Yup.string().required('Required'),
          phone_number: Yup.string().required('Required'),
        })}
        onSubmit={(data) => {
          const customerData: ICustomerDataRequest = data
          localStorage.setItem('customer', JSON.stringify(customerData))
          dispatch(startSaveCustomer(customerData))
          dispatch(onModelingTransactionData({
            customer_data: {
              full_name: data.full_name,
              legal_id: data.legal_id,
              legal_id_type: data.legal_id_type,
              phone_number: data.phone_number
            },
            customer_email: data.email
          }))
          dispatch(onSetForm2())
        }}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <form className="flex flex-col mx-auto" onSubmit={handleSubmit}>
            <div className="flex gap-3">
              <select
                name="legal_id_type"
                className="input-text"
                onChange={handleChange}
                value={values.legal_id_type}
              >
                <option value="CC">CC</option>
                <option value="NIT">NIT</option>
                <option value="PP">PP</option>
              </select>

              <input
                type="text"
                name="legal_id"
                placeholder="Identification"
                onChange={handleChange}
                value={values.legal_id}
                className={(errors.legal_id && touched.legal_id) ? 'input-text input-error flex-1' : 'input-text flex-1'}
              />
            </div>
            {(errors.legal_id && touched.legal_id) && <span className="label-input-error">{errors.legal_id}</span>}

            <input
              type="text"
              name="full_name"
              placeholder="Full name"
              onChange={handleChange}
              value={values.full_name}
              className={errors.full_name && touched.full_name ? 'input-text input-error' : 'input-text'}
            />
            {(errors.full_name && touched.full_name) && <span className="label-input-error">{errors.full_name}</span>}

            <input
              type="text"
              name="email"
              placeholder="E-mail"
              onChange={handleChange}
              value={values.email}
              className={errors.email && touched.email ? 'input-text input-error' : 'input-text'}
            />
            {(errors.email && touched.email) && <span className="label-input-error">{errors.email}</span>}

            <input
              type="text"
              name="phone_number"
              placeholder="Phone"
              onChange={handleChange}
              value={values.phone_number}
              className={errors.phone_number && touched.phone_number ? 'input-text input-error' : 'input-text'}
            />
            {(errors.phone_number && touched.phone_number) && <span className="label-input-error">{errors.phone_number}</span>}

            <button
              type='submit'
              className='card-button !w-fit !text-xs ml-auto !mt-10 !py-2 !px-5 cursor-pointer'
            >
              Next
            </button>
          </form>
        )}
      </Formik>
    </div>
  )
}
