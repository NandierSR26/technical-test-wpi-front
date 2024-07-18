import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { ICardTokenizeRequest, ITransactionDataRequest } from "../../interfaces";
import { RootState } from "../store";
import { api } from "../../api";
import { onFetching, onTokenizeCard } from "./transactionsSlice";

const { transactions } = api()

export const startTokenizeCard = (card: ICardTokenizeRequest) => {
  return async(dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch( onFetching(true) )
      const { data } = await transactions.tokenize(card)
      dispatch( onTokenizeCard(data.id) )
    } catch (error) {
      console.log(error);
      
    }
  }
}

export const startCreateTransaction = (transactionData: ITransactionDataRequest) => {
  return async(dispatch: ThunkDispatch<RootState, undefined, AnyAction>) => {
    try {
      dispatch( onFetching(true) )
      await transactions.create(transactionData)
      dispatch( onFetching(false) )
    } catch (error) {
      console.log(error);
      
    }
  }
}