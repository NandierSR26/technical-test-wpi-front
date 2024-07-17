import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductDataResponse } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  products: IProductDataResponse[] | null;
  product: IProductDataResponse | null;
}

export const productSlice = createSlice({
  name: 'products',
  initialState: {
    isFetching: false,
    products: null,
    product: null
  } as InitialState,
  reducers: {
    onGetProducts: (state, { payload }: PayloadAction<IProductDataResponse[]>) => {
      state.products = payload
      state.isFetching = false
    },
    onGetProductByID: (state, { payload }: PayloadAction<IProductDataResponse>) => {
      state.product = payload
      state.isFetching = false
    },
    onFetching: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
    onClear: (state) => {
      state.isFetching = false
      state.products = null
    }
  }
})

export const { onGetProducts, onGetProductByID, onFetching, onClear } = productSlice.actions;