import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { IOrderDataRequest } from "../../interfaces/orders.interface";
import { RootState } from "../store";
import { api } from "../../api";
import { onFetching, onNewOrder } from "./ordersSlice";

const { orders } = api()

export const startCreateOrder = (orderData: IOrderDataRequest) => {
  return async( dispatch: ThunkDispatch<RootState, undefined, AnyAction> ) => {
    try {
      dispatch( onFetching(true) )
      const { data } = await orders.create(orderData)
      console.log(data);
      dispatch( onNewOrder(data) )
    } catch (error) {
      console.log(error);
    }
  }
}