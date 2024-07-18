import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderDataRequest, IOrderDataResponse } from "../../interfaces/orders.interface";

export interface ResumeDetails {
  productPrice: number;
  tax: number;
  shipping: number;
  subtotal: number;
}

interface InitialState {
  isFetching: boolean;
  order: IOrderDataResponse | null,
  orderFormData: IOrderDataRequest,
  orderDetails: ResumeDetails
}

const orderFormData: IOrderDataRequest = {
  address_line_1: "",
  address_line_2: "",
  country: "",
  region: "",
  city: "",
  postal_code: "",
  total: "",
  product_amount: "",
  customer: "",
  transaction: "",
  product: ""
}

export const ordersSclice = createSlice({
  name: 'orders',
  initialState: {
    isFetching: false,
    order: null,
    orderFormData,
    orderDetails: {}
  } as InitialState,
  reducers: {
    onAddOrderDetails: (state, {payload}: PayloadAction<ResumeDetails>) => {
      state.orderDetails = payload
    },
    onAddOrderFormData: (state, {payload}: PayloadAction<Partial<IOrderDataRequest>>) => {
      state.orderFormData = { ...state.orderFormData, ...payload }
    },
    onNewOrder: (state, {payload}: PayloadAction<IOrderDataResponse>) => {
      state.order = payload
      state.isFetching = false
    },
    onFetching: (state, {payload}: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
    clear: (state) => {
      state.isFetching = false,
      state.order = null
    }
  }
})

export const { onNewOrder, onFetching, clear, onAddOrderFormData, onAddOrderDetails } = ordersSclice.actions