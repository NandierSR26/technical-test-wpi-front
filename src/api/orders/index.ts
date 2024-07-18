import { AxiosInstance } from "axios";
import { IOrderDataRequest, IOrderDataResponse } from "../../interfaces/orders.interface";

export default function Action(api: AxiosInstance) {
  return {
    create: (data: IOrderDataRequest) => api.post<IOrderDataResponse>('/orders', data)
  }
}