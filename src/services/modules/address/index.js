import { api } from '@/services'
import fetchAddressOne from './fetchAddressOne'
import fetchAddress from './fetchAddress'
import addAddress from './addAddress'
import updateAddress from './updateAddress'
import deleteAddress from './deleteAddress'

export const addressApi = api.injectEndpoints({
  endpoints: build => ({
      fetchAddressOne: fetchAddressOne(build),
      fetchAddress: fetchAddress(build),
      addAddress: addAddress(build),
      updateAddress: updateAddress(build),
      deleteAddress: deleteAddress(build)
      
  }),
  overrideExisting: false,
})

export const { 
  useLazyFetchAddressOneQuery,
  useLazyFetchAddressQuery,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressApi
