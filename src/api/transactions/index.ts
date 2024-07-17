import { AxiosInstance } from "axios";
import { ICardTokenizeRequest, ITransactionDataRequest } from "../../interfaces";

export default function Action(api: AxiosInstance) {
  return {
    tokenize: (data: ICardTokenizeRequest) => api.post('/token-card'),
    create: (data: ITransactionDataRequest) => api.post('transactions', data)
  }
}