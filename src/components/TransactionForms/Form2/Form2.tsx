import { Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { onSetForm1, onSetForm3 } from '../../../store/ui/uiSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/useReduxFunctions';
import { ICardTokenizeRequest } from '../../../interfaces';
import * as Yup from 'yup'
import { startTokenizeCard } from '../../../store/transactions/thunks';
import { onModelingTransactionData } from '../../../store/transactions/transactionsSlice';
import { store } from '../../../store';

export const Form2 = () => {

  const { isFetching: isFetchingTransactions } = useAppSelector(state => state.transactions)

  const [initialValues, setInitialValues] = useState<ICardTokenizeRequest>({
    number: '',
    card_holder: '',
    cvc: '',
    exp_month: '',
    exp_year: ''
  })
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!localStorage.getItem('card-data')) {
      setIsLoading(false)
      return
    }

    setInitialValues(
      JSON.parse(localStorage.getItem('card-data')!)
    )
    setIsLoading(false)
  }, [])

  if (isLoading || isFetchingTransactions) return <h1>Cargando ...</h1>

  return (
    <div className="form-container">
      <h2 className="font-semibold text-gray-800 mb-7 text-center text-xl">Enter your credit card</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          number: Yup.string().required('Required'),
          cvc: Yup.string().required('Required'),
          exp_month: Yup.string().required('Required'),
          exp_year: Yup.string().required(''),
          card_holder: Yup.string().required('Required'),
        })}
        onSubmit={async (data) => {
          localStorage.setItem('card-data', JSON.stringify(data))
          await dispatch(startTokenizeCard(data))
          dispatch(onModelingTransactionData({
            payment_method: {
              installments: 1,
              token: store.getState().transactions.tokenizeCardData,
              type: 'CARD'
            }
          }))
          dispatch(onSetForm3())
        }}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <form className="flex flex-col mx-auto max-w-sm" onSubmit={handleSubmit}>

            <input
              type="text"
              name="number"
              placeholder="Number"
              onChange={handleChange}
              value={values.number}
              className={(errors.number && touched.number) ? 'input-text input-error flex-1' : 'input-text flex-1'}
            />
            {(errors.number && touched.number) && <span className="label-input-error">{errors.number}</span>}

            <div className="flex gap-3">
              <div className="flex gap-2 w-[112px]" id="expirate-date">
                <input
                  type="text"
                  name="exp_month"
                  placeholder="MM"
                  onChange={handleChange}
                  value={values.exp_month}
                  className={errors.exp_month && touched.exp_month ? 'input-text input-error !w-[50px]' : 'input-text !w-[50px]'}
                />

                <input
                  type="text"
                  name="exp_year"
                  placeholder="YY"
                  onChange={handleChange}
                  value={values.exp_year}
                  className={errors.exp_year && touched.exp_year ? 'input-text input-error !w-[50px]' : 'input-text !w-[50px]'}
                />
              </div>

              <div className="flex-1" id="cvc">
                <input
                  type="text"
                  name="cvc"
                  placeholder="CVC"
                  onChange={handleChange}
                  value={values.cvc}
                  className={errors.cvc && touched.cvc ? 'input-text input-error !w-full' : 'input-text !w-full'}
                />
              </div>
            </div>


            <input
              type="text"
              name="card_holder"
              placeholder="Card holder"
              onChange={handleChange}
              value={values.card_holder}
              className={errors.card_holder && touched.card_holder ? 'input-text input-error' : 'input-text'}
            />
            {(errors.card_holder && touched.card_holder) && <span className="label-input-error">{errors.card_holder}</span>}


            <div className="flex justify-between gap-5">
              <button
                className="card-button !w-fit !text-xs mr-auto !mt-10 !py-2 !px-5 cursor-pointer !bg-[#fb3f3f]"
                onClick={() => dispatch(onSetForm1())}
              >
                Back
              </button>

              <button
                type='submit'
                className='card-button !w-fit !text-xs ml-auto !mt-10 !py-2 !px-5 cursor-pointer'
              >
                Next
              </button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}
