import React, { useState, useEffect } from 'react'
import { MyView, MyText, MyButton, MySongList } from './styles'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setAccessToken } from '_redux/features/authenticationSlice'
import authHandler from '_utils/authenticationHandler'

function PlaylistDetailScreen({ route, navigation, authentication, ...props }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [accessToken, setLocalAccessToken] = useState(null)
  const { playlistID } = route.params
  console.debug('playlistID', playlistID)
  useEffect(() => {
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) => {
      getSongsOfPlaylist(token, playlistID)
      setLocalAccessToken(token)
      setLoading(false)
    })
  }, [authentication, playlistID])
  const pop = () => navigation.dispatch(StackActions.pop(1))

  const getSongsOfPlaylist = async (aToken, aPlaylist) => {
    console.log('Passing', aToken, aPlaylist)
    const response = await authHandler.get(`/playlists/${aPlaylist}`, aToken)
    if (response) {
      setSongs(response.data.tracks.items)
    } else {
      console.debug(response)
    }
    console.log('playlists set!!!')
  }

  function renderListItem({ item }) {
    return <MyText>{item.track.name || 'NULL'}</MyText>
  }
  return loading ? (
    <MyText> Loading... </MyText>
  ) : (
    <MyView>
      <MyText> PlaylistID: {playlistID} </MyText>
      <MyButton onPress={pop}>
        <MyText>Go back</MyText>
      </MyButton>
      <MySongList
        data={songs}
        renderItem={renderListItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </MyView>
  )
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

// enough boilerplate ;)
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  setAccessToken,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailScreen)
