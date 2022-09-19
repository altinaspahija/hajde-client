import { api } from '../../api'
import fetchCities from './fetchCities'

export const citiesApi = api.injectEndpoints({
  endpoints: build => ({
      fetchCities: fetchCities(build),
  }),
  overrideExisting: false,
})

export const { useLazyFetchCitiesQuery } = citiesApi
