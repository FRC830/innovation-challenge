import styled from 'styled-components/native'
import React from 'react'
import PressableIcon from '_components/PressableIcon'
const ItemWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 10px;
`
const MyButton = styled.TouchableOpacity``
const MyText = styled.Text``
function PlaylistItem({ data, onInfo, onSelect }) {
  return (
    <ItemWrapper>
      <MyButton onPress={onSelect}>
        <MyText>{data.name}</MyText>
      </MyButton>
      <PressableIcon name={'info-circle'} onPress={onInfo} />
    </ItemWrapper>
  )
}
export default PlaylistItem
