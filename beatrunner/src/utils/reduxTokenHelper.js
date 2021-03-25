import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import authHandler from '_utils/authenticationHandler'

export const updateReduxWithValidAccessToken = async ({
  accessToken,
  accessExpiration,
  refreshToken,
}) => {
  if (accessToken === null || new Date() > new Date(accessExpiration)) {
    console.log('Access Token is Invalid, Refreshing...')
    console.log('refreshToken=', refreshToken)
    const response = await authHandler.refreshLogin(refreshToken)
    accessToken = response.accessToken
    setAccessToken({
      accessToken,
      accessExpiration: response.accessTokenExpirationDate,
    })
    setRefreshToken({
      refreshToken: response.refreshToken,
    })
  }
  return accessToken
}
