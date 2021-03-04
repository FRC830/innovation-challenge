import React from 'react'
import { MyView, MyText, MyButton } from './styles'
import { StackActions } from '@react-navigation/native'

function PlaylistDetail({ route, navigation, ...props }) {
  const { playlistID } = route.params
  return (
    <MyView>
      <MyText> PlaylistID: {playlistID} </MyText>
      <MyButton onClick={() => navigation.dispatch(StackActions.pop(1))}>
        Go back
      </MyButton>
    </MyView>
  )
}

export default PlaylistDetail
