import styled from 'styled-components/native'
import React from 'react'
import { Dimensions } from 'react-native'
import PressableIcon from '_components/PressableIcon'
const ItemWrapper = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
`
const MyButton = styled.TouchableOpacity`
  width: 390px;
  display: flex;
  flex-direction: row;
  flex-shrink: 1;
  align-items: center;
`
const MyText = styled.Text`
  color: white;
  font-size: 15px;
  display: flex;
  flex-shrink: 1;
  margin: 10px;
`

const MyImage = styled.Image`
  width: 64px;
  height: 64px;
`

function PlaylistItem({ data, onInfo, onSelect }) {
  console.log(data.images[0].url)
  console.log(Dimensions.get('window').width)
  return (
    <ItemWrapper>
      <MyButton onPress={onSelect}>
        <MyImage source={{ uri: data.images[0].url }} />
        <MyText>{data.name}</MyText>
      </MyButton>
      <PressableIcon
        name={'info-circle'}
        onPress={onInfo}
        color="white"
        size={30}
      />
    </ItemWrapper>
  )
}
export default PlaylistItem
