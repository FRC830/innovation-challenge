import React, { useState, useEffect } from 'react'
import { MyView, MyText, MyButton, MySongList } from './styles'
import { StackActions } from '@react-navigation/native'
import { connect } from 'react-redux'
import { setAccessToken } from '_redux/features/authenticationSlice'
import authHandler from '_utils/authenticationHandler'

function PlaylistDetailScreen({ route, navigation, authentication, ...props }) {
  const [songs, setSongs] = useState([])
  const [loading, setLoading] = useState(true)
  const [reachedEnd, setReachedEnd] = useState(false)
  // const [accessToken, setLocalAccessToken] = useState(null)
  const [page, setPage] = useState(0)
  const { playlistID } = route.params

  const pop = () => navigation.dispatch(StackActions.pop(1))

  const getSongsOfPlaylist = async (aToken, aPlaylist, aPage) => {
    console.log('getSongsOfPlaylist', aPage)
    const response = await authHandler.get(`/playlists/${aPlaylist}`, aToken, {
      offset: 100 * aPage,
    })
    if (response) {
      console.log(response.data.tracks.items.length, 'new songs')
      console.log(response.data.tracks.total, 'Total songs')
      setSongs([...songs, ...response.data.tracks.items])
      if (
        songs.length + response.data.tracks.items.length >=
        response.data.tracks.total
      ) {
        setReachedEnd(true)
      }
    } else {
      console.debug('MAJOR ERROR!@!!!')
      console.debug(response)
    }
  }

  function renderListItem({ item }) {
    return <MyText>{item.track.name || 'NULL'}</MyText>
  }

  useEffect(() => {
    console.log('Loading state set to', loading)
  }, [loading])
  useEffect(() => {
    console.log('page state set to', page)
    setLoading(true)
    updateReduxWithValidAccessToken(authentication).then((token) =>
      getSongsOfPlaylist(token, playlistID, page),
    )
    setLoading(false)
  }, [page])
  useEffect(() => {
    console.log('song length now', songs.length)
  }, [songs])
  async function loadMore() {
    console.log('loadMore')
    if (!loading && !reachedEnd) {
      setPage(page + 1)
    }
  }

  function renderFooter() {
    if (!loading) {
      return <MyText> END OF DATA </MyText>
    }
    return <MyText> Loading more... </MyText>
  }
  return loading && page === 0 ? (
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
        keyExtractor={(_, index) => index.toString()}
        ListFooterComponent={renderFooter}
        onEndReached={loadMore}
        onEndReachedThreshold={0.25} // They must scroll 75% through data to load
      />
    </MyView>
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
