import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'city',
  initialState: { city: null },
  reducers: {
    changeCity: (state, { payload: city }) => {
      if (typeof city !== 'undefined') {
        state.city = city
      }
    },
    setDefaultCity: (state, { payload: city }) => {
      if (!state.city) {
        state.city = city
      }
    },
  },
})

export const { changeCity, setDefaultCity } = slice.actions

export default slice.reducer
