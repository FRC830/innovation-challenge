import React, { useState, useEffect } from 'react'
import { MainView, Text } from './styles'

import { connect } from 'react-redux'

import { updateReduxWithValidAccessToken } from '_utils/reduxTokenHelper'
import { remote, auth } from 'react-native-spotify-remote'

import authHandler from '_utils/authenticationHandler'
import PressableIcon from '_components/PressableIcon'
async function playSong(token, song) {
  try {
    await auth.authorize({
      clientID: authHandler.spotifyAuthConfig.clientId,
      redirectURL: authHandler.spotifyAuthConfig.redirectUrl,
      skipAuthAccessToken: token, // this will just be returned in the android flow
    })
    await remote.connect(token)
    await remote.playUri(song)
  } catch (error) {
    console.error(error)
    throw error
  }
}
const getAudioFeatures = async (aToken, songs) => {
  let response = (
    await authHandler.get('/audio-features', aToken, {
      ids: songs.join(','),
    })
  ).data.audio_features

  return response
}
const getListOfTracks = async (aToken, playlist_id) => {
  console.log('Passing', aToken)
  let promises = []
  let finished = false
  let offset = 0
  let limit = 100
  while (!finished) {
    const response = (
      await authHandler.get(`/playlists/${playlist_id}/tracks`, aToken, {
        limit: limit,
        offset: offset,
        market: 'US',
        fields: 'items(track.id), offset, total',
      })
    ).data
    let songs = response.items
      .map((track) => (track.track ? track.track.id : null))
      .filter((s) => s !== null)
    let bpmsPromise = getAudioFeatures(aToken, songs)
    promises.push(bpmsPromise)
    let total = response.total
    let offset = response.offset + 100
    if (offset > total) {
      finished = true
    }
    let limit = Math.min(100, response.total - offset)
  }
  return promises
}

function PlayScreen({ route, authentication, ...props }) {
  const [accessToken, setLocalAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [audioQueue, setAudioQueue] = useState([])
  let targetBPM = 80
  let n = route.params.include ? 2 : 1
  useEffect(() => {
    updateReduxWithValidAccessToken(authentication)
      .then((token) => {
        setLocalAccessToken(token)
        return getListOfTracks(token, route.params.playlistID)
      })
      .then((promises) => {
        console.log('Song list received')
        return Promise.all(promises)
      })
      .then((audio_features) => {
        console.log('Audio features received')
        let minimal_audio_features = audio_features
          .flatMap((x) => x)
          .map((feature) => {
            return {
              tempo: feature.tempo,
              uri: feature.uri,
            }
          })

        minimal_audio_features.sort((a, b) => {
          let aDistanceToTarget = Math.min(
            Math.abs(a.tempo - targetBPM),
            Math.abs(b.tempo - targetBPM * n),
          )
          let bDistanceToTarget = Math.min(
            Math.abs(b.tempo - targetBPM),
            Math.abs(b.tempo - targetBPM * n), // lazy shortcut
          )

          return aDistanceToTarget == bDistanceToTarget
            ? 0
            : aDistanceToTarget < bDistanceToTarget
            ? -1
            : 1
        })

        console.log(minimal_audio_features.slice(0, 5))
        console.log(
          minimal_audio_features.slice(minimal_audio_features.length - 5),
        )
        setAudioQueue(minimal_audio_features)
        setLoading(false)
        console.log('Done')
      })
  }, [authentication])

  return (
    <MainView>
      <Text> {route.params.playlistID} </Text>
      <Text> {accessToken} </Text>
      <Text> {loading ? 'LOADING...' : 'DONE LOADING'}</Text>
      <Text>
        {audioQueue
          .slice(0, 5)
          .map((x) => x.tempo)
          .join('|')}
      </Text>
      <PressableIcon
        name={'play'}
        onPress={() => playSong(accessToken, audioQueue[0].uri)}
        color="white"
      />
    </MainView>
  )
}

const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {}
export default connect(mapStateToProps, mapDispatchToProps)(PlayScreen)
