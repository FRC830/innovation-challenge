import React, { useState, useEffect } from 'react'
import {
  ContainerView,
  MyText,
  MyButton,
  MySongList,
  ListItemContainer,
  OverlaidSelectButton,
  MyImage,
  SeparatorLine,
} from './styles'

import PressableIcon from '_components/PressableIcon'
import SongListItem from '_components/SongListItem'
import { ActivityIndicator } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'
import authHandler from '_utils/authenticationHandler'
import TrackPlayer from 'react-native-track-player'

function PlaylistDetailScreen({ route, navigation, authentication, ...props }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [songsToFetch, setSongsToFetch] = useState(100)
  let currentlyPlaying = null
  // const [accessToken, setLocalAccessToken] = useState(null)
  const [page, setPage] = useState(0)
  const { playlistID } = route.params
  const pop = () => navigation.dispatch(StackActions.pop(1))
  useEffect(() => {
    setLoading(true)
    TrackPlayer.setupPlayer().then(() => {
      console.debug('Player Initialized.')
    })
    setLoading(false)
  })
  const getSongsOfPlaylist = async (aToken, aPlaylist, aPage, aLimit) => {
    console.log('getSongsOfPlaylist', aPage)
    const response = await authHandler.get(
      `/playlists/${aPlaylist}/tracks`,
      aToken,
      {
        offset: 100 * aPage,
        limit: aLimit,
        fields:
          'total,items(track(preview_url, id, name, duration_ms, artists, album(!available_markets)))',
      },
    )
    if (response) {
      console.log(response.data)
      console.log(response.data.items.length, 'new songs')
      console.log(response.data.total, 'Total songs')
      const remainingSongs =
        response.data.total - songs.length - response.data.items.length
      setSongsToFetch(Math.min(100, remainingSongs))
      setSongs([...songs, ...response.data.items])
    } else {
      console.debug('MAJOR ERROR!@!!!')
      console.debug(response)
    }
  }
  async function onTap(song) {
    if (song !== null) {
      if (currentlyPlaying !== song) {
        await TrackPlayer.reset()
        await TrackPlayer.add({
          url: song,
        })
      }
      await TrackPlayer.play()
      currentlyPlaying = song
    } else {
      await TrackPlayer.pause()
    }
  }
  function renderListItem({ item }) {
    return <SongListItem data={item} onTap={onTap} />
  }
  useEffect(() => {
    console.log('Songs to fetch set to', songsToFetch)
  }, [songsToFetch])
  useEffect(() => {
    console.log('Loading state set to', loading)
  }, [loading])
  useEffect(() => {
    console.log('page state set to', page)
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) => {
      getSongsOfPlaylist(token, playlistID, page)
      setLoading(false)
    })
  }, [page])
  useEffect(() => {
    console.log('song length now', songs.length)
  }, [songs])
  async function loadMore() {
    console.log('loadMore')
    if (!loading && songsToFetch > 1) {
      setPage(page + 1)
    }
  }

  function renderFooter() {
    if (!loading) {
      return <MyText> END OF DATA </MyText>
    }
    return <ActivityIndicator animating />
  }

  function renderSeparator() {
    return <SeparatorLine />
  }
  return loading && page === 0 ? (
    <MyText> Loading... </MyText>
  ) : (
    <ContainerView>
      <MyText> PlaylistID: {playlistID} </MyText>
      <MyButton onPress={pop}>
        <MyText>Go back</MyText>
      </MyButton>
      <MySongList
        data={songs}
        renderItem={renderListItem}
        keyExtractor={(_, index) => index.toString()}
        ItemSeparatorComponent={renderSeparator}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.1} // They must scroll 75% through data to load
      />
      <OverlaidSelectButton
        onPress={() => navigation.navigate('PlaylistSettings')}>
        <MyText> Select </MyText>
      </OverlaidSelectButton>
    </ContainerView>
  )
}

async function updateReduxWithValidAccessToken({
  accessToken,
  accessExpiration,
  refreshToken,
}) {
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

// enough boilerplate ;)
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailScreen)
