import { api } from '../../api'
import fetchOrderDetails from './fetchOrderDetails'
import fetchOrders from './fetchOrders'

export const orderApi = api.injectEndpoints({
  endpoints: build => ({
    fetchOrders: fetchOrders(build),
    fetchOrderDetails: fetchOrderDetails(build)
  }),
  overrideExisting: false,
})

export const { useLazyFetchOrdersQuery, useLazyFetchOrderDetailsQuery } = orderApi
