import styled from 'styled-components/native'
import React, { useState, useEffect } from 'react'
import PressableIcon from '_components/PressableIcon'

const ListItemContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LeftSideGroup = styled.View`
  display: flex;
  flex-direction: row;
`
const AlbumCover = styled.Image`
  width: 64px;
  height: 64px;
`

const SongTitle = styled.Text``

function PlayButtonEmitter({ disabled, onEmit }) {
  const [isPlaying, setIsPlaying] = useState(false)

  if (!disabled) {
    return (
      <PressableIcon
        name={disabled ? '' : isPlaying ? 'pause' : 'play'}
        onPress={() => {
          onEmit(!isPlaying)
          setIsPlaying(!isPlaying)
        }}
      />
    )
  }
  return null
}
function SongListItem({ data, onTap }) {
  useEffect(() => {
    console.log('Rendering in useEffect', data.track.name)
  })
  const soundURL = data.track.preview_url
  return (
    <ListItemContainer>
      <LeftSideGroup>
        <AlbumCover source={{ uri: data.track.album.images[2].url }} />
        <SongTitle>{data.track.name || 'NULL'}</SongTitle>
      </LeftSideGroup>
      <PlayButtonEmitter
        disabled={soundURL === null}
        onEmit={(play) => onTap(play ? soundURL : null)}
      />
    </ListItemContainer>
  )
}
export default SongListItem
