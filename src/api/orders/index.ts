import { AxiosInstance } from "axios";
import { IOrderDataRequest } from "../../interfaces/orders.interface";

export default function Action(api: AxiosInstance) {
  return {
    create: (data: IOrderDataRequest) => api.post('/orders', data)
  }
}