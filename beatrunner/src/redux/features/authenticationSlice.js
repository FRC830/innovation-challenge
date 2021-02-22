import { createSlice } from '@reduxjs/toolkit'

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState: {
    accessToken: null,
    accessExpiration: null,
    refreshToken: null,
    loading: false,
  },
  reducers: {
    setAccessToken(state, action) {
      const { accessToken, accessExpiration } = action.payload
      state.accessToken = accessToken
      state.accessExpiration = accessExpiration
    },
    setRefreshToken(state, action) {
      state.refreshToken = action.payload.refreshToken
    },
    setLoadingTrue(state) {
      state.loading = true
    },
    setLoadingFalse(state) {
      state.loading = false
    },
  },
})

export const {
  setAccessToken,
  setRefreshToken,
  setLoadingFalse,
  setLoadingTrue,
} = authenticationSlice.actions

export default authenticationSlice.reducer
