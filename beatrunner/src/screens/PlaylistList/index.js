import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import { MyText, MyButton } from './styles'
import authHandler from '_utils/authenticationHandler'

import { remote } from 'react-native-spotify-remote'

async function playSong(token) {
  try {
    await remote.connect(token)
    await remote.playUri('spotify:track:6IA8E2Q5ttcpbuahIejO74')
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateReduxWithValidAccessToken(
  { accessToken, accessExpiration, refreshToken },
  setLoading,
) {
  if (accessToken === null || new Date() < accessExpiration) {
    console.log('Access Token is Invalid, Refreshing...')
    console.log('refreshToken=', refreshToken)
    const response = await authHandler.refreshLogin(refreshToken)
    console.debug(response)
    setAccessToken({
      accessToken: response.accessToken,
      accessExpiration: response.accessTokenExpirationDate,
    })
  }
}
function PlaylistListScreen({ authentication, ...props }) {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    updateReduxWithValidAccessToken(authentication)
    setLoading(false)
  })

  return loading ? (
    <MyText>Loading.......</MyText>
  ) : (
    <View>
      <MyText>
        Hello therre, our access token is {authentication.accessToken} and will
        expire {authentication.accessExpiration}
      </MyText>
      <MyButton onPress={() => playSong(authentication.accessToken)}>
        <MyText>Play a song using remote</MyText>
      </MyButton>
    </View>
  )
}
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListScreen)
