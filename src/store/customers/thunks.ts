import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ICustomerDataRequest } from "../../interfaces";
import { RootState } from "../store";
import { api } from "../../api";
import { onSaveCustomer } from "./customersSlice";

const { customers } = api();

export const startSaveCustomer = (customer: ICustomerDataRequest) => {
  return async(dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      const {data} = await customers.create(customer);
      dispatch( onSaveCustomer(data) )
    } catch (error) {
      console.log(error); 
    }
  }
}