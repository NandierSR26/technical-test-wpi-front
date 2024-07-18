import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import {
  ICardTokenizeRequest,
  ITransactionDataRequest,
} from "../../interfaces";
import { RootState, store } from "../store";
import { api } from "../../api";
import {
  onFetching,
  onNewTransaction,
  onTokenizeCard,
} from "./transactionsSlice";
import { onAddOrderFormData } from "../orders/ordersSlice";
import { onHideFloatingElements } from "../ui/uiSlice";
import Swal from "sweetalert2";

const { transactions, orders } = api();

export const startTokenizeCard = (card: ICardTokenizeRequest) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch(onFetching(true));
      const { data } = await transactions.tokenize(card);
      dispatch(onTokenizeCard(data.id));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startCreateTransaction = (
  transactionData: ITransactionDataRequest
) => {
  return async (dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch(onFetching(true));
      const { data } = await transactions.create(transactionData);
      console.log(data)
      dispatch(onNewTransaction(data));
      dispatch(
        onAddOrderFormData({
          transaction: data.id,
        })
      );

      const orderData = store.getState().orders.orderFormData
      await orders.create(orderData)
      dispatch( onHideFloatingElements() )
      Swal.fire('Transaction Successfully', '', 'success')
    } catch (error) {
      console.log(error);
      Swal.fire('Transaction Error', 'Transaction was rejected', 'error')
    }
  };
};
