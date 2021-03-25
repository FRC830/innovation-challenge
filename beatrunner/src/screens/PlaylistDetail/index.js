import React, { Component } from 'react'
import {
  ContainerView,
  MyText,
  MyButton,
  MySongList,
  OverlaidSelectButton,
} from './styles'

import SongListItem from '_components/SongListItem'
import { StackActions } from '@react-navigation/native'
import Seperator from '_components/Seperator'
import { connect } from 'react-redux'
import { updateReduxWithValidAccessToken } from '_utils/reduxTokenHelper'
import authHandler from '_utils/authenticationHandler'
import TrackPlayer from 'react-native-track-player'

class PlaylistDetailScreen extends Component {
  constructor(props) {
    super(props)
    // { route, navigation, authentication, ...props
    this.state = {
      songs: [],
      loading: false,
      page: 0,
      songsToFetch: 100,
      playlistID: props.route.params.playlistID,
    }
    this.navigation = props.navigation
    this.authentication = props.authentication
    this.token = null
  }

  getSongsSafely = () => {
    updateReduxWithValidAccessToken(this.authentication).then((token) =>
      this.getSongsOfPlaylist(token),
    )
  }
  componentDidMount() {
    // TrackPlayer.setupPlayer().then(() => {
    //   console.debug('Player Initialized.')
    // })
    this.getSongsSafely()
  }

  pop = () => this.navigation.dispatch(StackActions.pop(1))
  currentlyPlaying = null

  getSongsOfPlaylist = async (aToken) => {
    console.log('getSongsOfPlaylist', this.state.page)
    console.log('limit', this.state.songsToFetch)
    const response = await authHandler.get(
      `/playlists/${this.state.playlistID}/tracks`,
      aToken,
      {
        offset: 100 * this.state.page,
        limit: this.state.songsToFetch,
        fields:
          'total,items(track(preview_url, id, name, duration_ms, artists, album(!available_markets)))',
      },
    )
    if (response) {
      console.log(response.data.items.length, 'new songs')
      console.log(response.data.total, 'Total songs')
      let remainingSongs =
        response.data.total -
        this.state.songs.length -
        response.data.items.length
      if (remainingSongs >= 0) {
        this.setState({ songs: [...this.state.songs, ...response.data.items] })
      } else {
        remainingSongs = 0
      }
      this.setState({ songsToFetch: Math.min(100, remainingSongs) })
    } else {
      console.error('There was a problem fetching data')
    }
  }
  onTap = async (song) => {
    if (song !== null) {
      if (this.currentlyPlaying !== song) {
        await TrackPlayer.reset()
        await TrackPlayer.add({
          url: song,
        })
      }
      await TrackPlayer.play()
      this.currentlyPlaying = song
    } else {
      await TrackPlayer.pause()
    }
  }

  renderListItem = ({ item }) => {
    return <SongListItem data={item} onTap={this.onTap} />
  }

  loadMore = () => {
    console.log('loadMore')
    this.setState({ page: this.state.page + 1 }, () => {
      this.getSongsSafely()
    })
  }

  renderFooter = () => {
    if (!this.state.loading) {
      return <MyText></MyText>
    } else {
      console.log('Already loading...')
      return <MyText> LOADING... </MyText>
    }
  }

  render() {
    return (
      <ContainerView>
        {/* <MyText> PlaylistID: {this.state.playlistID} </MyText>
        <MyButton onPress={this.pop}>
          <MyText>Go back</MyText>
        </MyButton> */}
        <MySongList
          data={this.state.songs}
          renderItem={this.renderListItem}
          keyExtractor={(_, index) => index.toString()}
          ItemSeparatorComponent={() => <Seperator />}
          ListFooterComponent={this.renderFooter}
          onEndReached={this.loadMore}
          onEndReachedThreshold={0.1} // They must scroll 90% through data to load
        />
        <OverlaidSelectButton
          onPress={() =>
            this.navigation.navigate('PlaylistSettings', {
              playlistID: this.state.playlistID,
            })
          }>
          <MyText> Select Playlist </MyText>
        </OverlaidSelectButton>
      </ContainerView>
    )
  }
}

// enough boilerplate ;)
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  // setAccessToken,
  // setRefreshToken,
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlaylistDetailScreen)
