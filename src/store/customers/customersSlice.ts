import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICustomerDataResponse } from "../../interfaces";

interface InitialState {
  isFetching: boolean,
  currentCustomer: ICustomerDataResponse | null
}

export const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    isFetching: false,
    currentCustomer: null
  } as InitialState,
  reducers: {
    onSaveCustomer: (state, {payload}:PayloadAction<ICustomerDataResponse>) => {
      state.currentCustomer = payload;
      state.isFetching = false
    },
    onFetching: (state, { payload }:PayloadAction<boolean>) => {
      state.isFetching = payload;
    },
    onClear: (state) => {
      state.isFetching = false;
      state.currentCustomer = null;
    }
  }
})

export const { onSaveCustomer, onFetching, onClear } = customersSlice.actions;