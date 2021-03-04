import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import { MyText, MyButton, MyList, MyView } from './styles'
import authHandler from '_utils/authenticationHandler'

import { remote, auth } from 'react-native-spotify-remote'

async function playSong(token) {
  try {
    await auth.authorize({
      clientID: authHandler.spotifyAuthConfig.clientId,
      redirectURL: authHandler.spotifyAuthConfig.redirectUrl,
      skipAuthAccessToken: token, // this will just be returned in the android flow
    })
    await remote.connect(token)
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
function PlaylistListScreen({ authentication, navigation, ...props }) {
  const [loading, setLoading] = useState(true)
  const [playlists, setPlaylists] = useState([])
  const [accessToken, setLocalAccessToken] = useState(null)
  useEffect(() => {
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) => {
      setLoading(false)
      setLocalAccessToken(token)
    })
  }, [authentication])

  const getPlaylists = async (aToken) => {
    console.log('Passing', aToken)
    const response = await authHandler.get('/me/playlists', aToken)
    if (response) {
      setPlaylists(response.data.items)
    } else {
      console.debug(response)
    }
    console.log('playlists set!!!')
  }

  const navigateCallback = (itemID) => {
    navigation.navigate('PlaylistDetail', {
      playlistID: itemID,
    })
  }
  function renderListItem({ item }) {
    return (
      <MyButton onPress={() => navigateCallback(item.id)}>
        <MyText> {item.name || 'NULL'} </MyText>
      </MyButton>
    )
  }
  return loading ? (
    <MyText>Loading</MyText>
  ) : (
    <MyView>
      <MyText>HELLO</MyText>
      <MyButton onPress={() => playSong(accessToken)}>
        <MyText>Play a song using remote</MyText>
      </MyButton>
      <MyButton onPress={() => getPlaylists(accessToken)}>
        <MyText>Get playlists</MyText>
      </MyButton>
      <MyList data={playlists} renderItem={renderListItem} />
    </MyView>
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
