import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import { MyText, MyButton, MyList } from './styles'
import authHandler from '_utils/authenticationHandler'

import { remote } from 'react-native-spotify-remote'

async function playSong(token) {
  try {
    await remote.connectWithoutAuth(
      authHandler.spotifyAuthConfig.clientId,
      authHandler.spotifyAuthConfig.clientId,
      authHandler.spotifyAuthConfig.redirectUrl,
    )
    await remote.playUri('spotify:track:6IA8E2Q5ttcpbuahIejO74')
  } catch (error) {
    console.error(error)
    throw error
  }
}

async function updateReduxWithValidAccessToken({
  accessToken,
  accessExpiration,
  refreshToken,
}) {
  console.log('Current accessToken is:', accessToken)
  if (accessToken === null || new Date() < accessExpiration) {
    console.log('Access Token is Invalid, Refreshing...')
    console.log('refreshToken=', refreshToken)
    const response = await authHandler.refreshLogin(refreshToken)
    accessToken = response.accessToken
    setAccessToken({
      accessToken,
      accessExpiration: response.accessTokenExpirationDate,
    })
  }
  return accessToken
}
function PlaylistListScreen({ authentication, ...props }) {
  const [loading, setLoading] = useState(true)
  const [accessToken, setLocalAccessToken] = useState(null)
  const [playlists, setPlaylists] = useState([])
  useEffect(() => {
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) => {
      setLocalAccessToken(token)
      setLoading(false)
    })
  }, [authentication])

  const getPlaylists = async (aToken) => {
    console.log('Passing', aToken)
    const response = await authHandler
      .get('/me/playlists', aToken)
      .then((r) => r.data.items)
    setPlaylists(response.map((r) => r.name))
    console.log('playlists set!!!')
  }
  function renderListItem({ item }) {
    return <MyText> {item || 'NULL'} </MyText>
  }
  return loading && accessToken ? (
    <MyText>Loading</MyText>
  ) : (
    <View>
      <MyText>TOKEN</MyText>
      <MyButton onPress={() => playSong(accessToken)}>
        <MyText>Play a song using remote</MyText>
      </MyButton>
      <MyButton onPress={() => getPlaylists(accessToken)}>
        <MyText>Get playlists</MyText>
      </MyButton>
      <MyList data={playlists} renderItem={renderListItem} />
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
