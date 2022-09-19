import { api } from '@/services'
import fetchBanners from './fetchBanners'

export const bannersApi = api.injectEndpoints({
  endpoints: build => ({
      fetchBanners: fetchBanners(build),
      
  }),
  overrideExisting: false,
})

export const { 
  useLazyFetchBannersQuery,
} = bannersApi
