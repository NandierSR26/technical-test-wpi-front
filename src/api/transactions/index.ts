import { AxiosInstance } from "axios";
import { ICardTokenizeRequest, ICardTokenizeResponse, ITransactionDataRequest } from "../../interfaces";

export default function Action(api: AxiosInstance) {
  return {
    tokenize: (data: ICardTokenizeRequest) => api.post<ICardTokenizeResponse>('/transactions/token-card', data),
    create: (data: ITransactionDataRequest) => api.post('transactions', data)
  }
}