import { AxiosInstance } from "axios";
import { ICardTokenizeRequest, ICardTokenizeResponse, ITransactionDataRequest, ITransactionDataResponse } from "../../interfaces";

export default function Action(api: AxiosInstance) {
  return {
    tokenize: (data: ICardTokenizeRequest) => api.post<ICardTokenizeResponse>('/transactions/token-card', data),
    create: (data: ITransactionDataRequest) => api.post<ITransactionDataResponse>('transactions', data)
  }
}