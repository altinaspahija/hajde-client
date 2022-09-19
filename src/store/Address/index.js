import { createSlice } from '@reduxjs/toolkit'

const slice = createSlice({
  name: 'address',
  initialState: { address: null },
  reducers: {
    changeAddress: (state, { payload: { address } }) => {
      if (typeof address !== 'undefined') {
        state.address = address
      }
    },
    setDefaultAddress: (state, { payload: { address } }) => {
      if (!state.address) {
        state.address = address
      }
    },
  },
})

export const { changeAddress, setDefaultAddress } = slice.actions

export default slice.reducer
