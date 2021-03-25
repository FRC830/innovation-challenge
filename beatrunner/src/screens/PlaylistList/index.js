import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import {
  MyText,
  MyButton,
  MyList,
  MyView,
  TitleView,
  TitleSeperator,
  TitleText,
} from './styles'
import Seperator from '_components/Seperator'
import PressableIcon from '_components/PressableIcon'
import authHandler from '_utils/authenticationHandler'
import { updateReduxWithValidAccessToken } from '_utils/reduxTokenHelper'
import PlaylistItem from '_components/PlaylistItem'

function PlaylistListScreen({ authentication, navigation, ...props }) {
  const [playlists, setPlaylists] = useState([])
  const [loading, setLoading] = useState(true)
  const [accessToken, setLocalAccessToken] = useState(null)
  useEffect(() => {
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) => {
      setLoading(false)
      setLocalAccessToken(token)
      getPlaylists(token)
    })
  }, [authentication])

  const getPlaylists = async (aToken) => {
    console.log('Passing', aToken)
    const response = await authHandler.get('/me/playlists', aToken, {
      limit: 50,
    })
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
      <PlaylistItem
        data={item}
        onInfo={() => navigateCallback(item.id)}
        onSelect={() => console.debug('Selected')}
      />
    )
  }
  return loading ? (
    <TitleText>Loading</TitleText>
  ) : (
    <MyView>
      <TitleView>
        <TitleText>Select Playlist </TitleText>
        <PressableIcon
          name={'cog'}
          size={40}
          color={'white'}
          onPress={() => navigation.navigate('Settings')}
        />
      </TitleView>
      <TitleSeperator />
      {/* <MyButton onPress={() => playSong(accessToken)}>
        <MyText>Play a song using remote</MyText>
      </MyButton> */}
      {/* <MyButton onPress={() => }>
        <MyText>Get playlists</MyText>
      </MyButton> */}
      <MyList
        data={playlists}
        renderItem={renderListItem}
        ItemSeparatorComponent={() => <Seperator />}
      />
    </MyView>
  )
}
// setAccessToken,
// setRefreshToken,
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PlaylistListScreen)
