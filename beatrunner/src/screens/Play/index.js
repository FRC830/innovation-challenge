import React, { useState, useEffect } from 'react'
import {
  MainView,
  MetadataItem,
  Text,
  IconBar,
  Image,
  Metadata,
  SongInfo,
  SongTitle,
  Artists,
} from './styles'

import { connect } from 'react-redux'

import { updateReduxWithValidAccessToken } from '_utils/reduxTokenHelper'
import { remote, auth } from 'react-native-spotify-remote'

import authHandler from '_utils/authenticationHandler'
import PressableIcon from '_components/PressableIcon'
async function queueSong(token, song) {
  try {
    await auth.authorize({
      clientID: authHandler.spotifyAuthConfig.clientId,
      redirectURL: authHandler.spotifyAuthConfig.redirectUrl,
      skipAuthAccessToken: token, // this will just be returned in the android flow
    })
    await remote.connect(token)
    await remote.queueUri(song)
  } catch (error) {
    console.error(error)
    throw error
  }
}
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

async function skipToNext(x) {
  await auth.authorize({
    clientID: authHandler.spotifyAuthConfig.clientId,
    redirectURL: authHandler.spotifyAuthConfig.redirectUrl,
    skipAuthAccessToken: x, // this will just be returned in the android flow
  })
  await remote.connect(x)
  await remote.skipToNext()
}
async function skipToPrevious(x) {
  await auth.authorize({
    clientID: authHandler.spotifyAuthConfig.clientId,
    redirectURL: authHandler.spotifyAuthConfig.redirectUrl,
    skipAuthAccessToken: x, // this will just be returned in the android flow
  })
  await remote.connect(x)
  await remote.skipToPrevious()
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
  let otherInfoLookup = {}
  let limit = 100
  while (!finished) {
    const response = (
      await authHandler.get(`/playlists/${playlist_id}/tracks`, aToken, {
        limit: limit,
        offset: offset,
        market: 'US',
        // total,items(track(preview_url, id, name, duration_ms, artists, album(!available_markets)))
        fields:
          'items(track(duration_ms, name, id, uri, artists(name), album(images))), offset, total',
      })
    ).data
    let songs = response.items.filter(
      (x) =>
        x.track != null &&
        x.track.album != null &&
        x.track.artists != null &&
        x.track.album.images[1] != null,
    )
    let songIds = songs.map((track) => track.track.id)
    let newLookupData = songs.reduce((accumulator, value) => {
      console.log(value.track)
      let seconds = value.track.duration_ms / 1000
      let f_minutes = Math.floor(seconds / 60)
      let s = '0' + Math.floor(seconds % 60)
      let f_seconds = s.substr(s.length - 2)
      let lookup = {
        artists: value.track.artists.map((x) => x.name),
        timestamp: `${f_minutes}:${f_seconds}`,
        name: value.track.name,
        image: value.track.album.images[1].url, // 300px
      }
      accumulator[value.track.uri] = lookup
      return accumulator
    })
    console.log(newLookupData)
    otherInfoLookup = Object.assign({}, otherInfoLookup, newLookupData)
    let bpmsPromise = getAudioFeatures(aToken, songIds)
    promises.push(bpmsPromise)
    let total = response.total
    let offset = response.offset + 100
    if (offset > total) {
      finished = true
    }
    let limit = Math.min(100, response.total - offset)
  }
  return [promises, otherInfoLookup]
}

function PlayScreen({ route, authentication, ...props }) {
  const [accessToken, setLocalAccessToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [audioQueue, setAudioQueue] = useState([])
  const [audioPosition, setAudioPosition] = useState(0)
  const [currentlyPlaying, setCurrentlyPlaying] = useState({})
  const [isPlaying, setIsPlaying] = useState(false)
  let targetBPM = 80
  let n = route.params.include ? 2 : 1
  useEffect(() => {
    updateReduxWithValidAccessToken(authentication)
      .then(async (token) => {
        setLocalAccessToken(token)
        return getListOfTracks(token, route.params.playlistID)
      })
      .then(async ([promises, otherinfo]) => {
        // console.log('Song list received', promises)
        return [await Promise.all(promises), otherinfo]
      })
      .then(([audio_features, otherinfo]) => {
        // console.log('Audio features received', audio_features)
        let minimal_audio_features = audio_features
          .flatMap((x) => x)
          .map((feature) => {
            return {
              tempo: feature.tempo,
              uri: feature.uri,
              ...otherinfo[feature.uri],
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

        // console.log(minimal_audio_features.slice(0, 5))
        setAudioQueue(minimal_audio_features)
        setLoading(false)
        // console.log('Done')
      })
  }, [authentication])
  // remote.addListener('playerStateChanged', (event) => {
  //   console.log('Player state changed!')
  //   console.log(event)
  // })
  return loading ? (
    <MainView>
      <Text> Loading... </Text>
    </MainView>
  ) : (
    <MainView>
      <SongInfo>
        <Text>Current device BPM: 80 </Text>
        <SongTitle>{currentlyPlaying.name}</SongTitle>
        <Artists>{(currentlyPlaying.artists || []).join(', ')}</Artists>
        <Metadata>
          <MetadataItem>BPM: {currentlyPlaying.tempo}</MetadataItem>
          <MetadataItem>Duration: {currentlyPlaying.timestamp}</MetadataItem>
        </Metadata>
        <Image source={{ uri: currentlyPlaying.image }}></Image>
      </SongInfo>
      <IconBar>
        <PressableIcon
          name={'backward'}
          onPress={async () => {
            if (audioPosition == 0) {
              console.log('Cannot go backward more')
            } else {
              let song = audioQueue[audioPosition - 1]
              await setAudioPosition(audioPosition - 1)
              await setCurrentlyPlaying(song)
              await playSong(accessToken, song.uri)
              await setIsPlaying(true)
            }
          }}
          color="white"
          size={50}
        />
        <PressableIcon
          name={isPlaying ? 'pause' : 'play'}
          onPress={async () => {
            setIsPlaying(!isPlaying)
            console.log('Currently playing', currentlyPlaying)
            if (currentlyPlaying.name === undefined) {
              let song = audioQueue[audioPosition]
              console.log('Song to queue', song)
              await setCurrentlyPlaying(song)
              await playSong(accessToken, song.uri)
            } else if (isPlaying) {
              try {
                await remote.pause()
              } catch (e) {
                console.log(e)
              }
            } else {
              await remote.resume()
            }
          }}
          color="white"
          size={50}
        />
        <PressableIcon
          name={'forward'}
          onPress={async () => {
            let song = audioQueue[audioPosition + 1]
            await setAudioPosition(audioPosition + 1)
            console.log(song)
            await setCurrentlyPlaying(song)
            await playSong(accessToken, song.uri)
            setIsPlaying(true)
          }}
          size={50}
          color="white"
        />
      </IconBar>
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
