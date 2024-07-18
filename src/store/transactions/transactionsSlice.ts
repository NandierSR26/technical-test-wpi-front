
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CustomerData, ITransactionDataRequest, ITransactionDataResponse, PaymentMethod, ShippingAddress } from "../../interfaces";

interface InitialState {
  isFetching: boolean;
  tokenizeCardData: string;
  transactionData: ITransactionDataRequest;
  newTransaction: ITransactionDataResponse | null
}

export const paymentMethodInit: PaymentMethod = {
  type: "",
  token: "",
  installments: 0,
};

export const customerDataInit: CustomerData = {
  phone_number: "",
  full_name: "",
  legal_id: "",
  legal_id_type: "",
};

export const shippingAddressInit: ShippingAddress = {
  address_line_1: "",
  address_line_2: "",
  country: "",
  region: "",
  city: "",
  name: "",
  phone_number: "",
  postal_code: "",
};

export const transactionDataInit: ITransactionDataRequest = {
  amount_in_cents: 0,
  currency: "",
  signature: "",
  customer_email: "",
  payment_method: paymentMethodInit,
  redirect_url: "",
  reference: "",
  customer_data: customerDataInit,
  shipping_address: shippingAddressInit,
};

export const transactionsSlice = createSlice({
  name: "transactions",
  initialState: {
    isFetching: false,
    tokenizeCardData: '',
    transactionData: transactionDataInit,
    newTransaction: null
  } as InitialState,
  reducers: {
    onNewTransaction: (state, { payload }: PayloadAction<ITransactionDataResponse>) => {
      state.newTransaction = payload
      state.isFetching = false
    },
    onModelingTransactionData: (state, { payload }: PayloadAction<Partial<ITransactionDataRequest>>) => {
      state.transactionData = {...state.transactionData, ...payload}
      state.isFetching = false
    },
    onTokenizeCard: (state, { payload }: PayloadAction<string>) => {
      state.tokenizeCardData = payload
      state.isFetching = false
    },
    onFetching: (state, { payload }: PayloadAction<boolean>) => {
      state.isFetching = payload
    },
    onClear: (state) => {
      state.isFetching = false,
      state.tokenizeCardData = '',
      state.transactionData = transactionDataInit
    }
  },
});

export const { onClear, onFetching, onModelingTransactionData, onTokenizeCard, onNewTransaction } = transactionsSlice.actions;
