import React from 'react'

import { Alert } from 'react-native'
// https://stackoverflow.com/questions/39282253/how-can-i-alias-a-default-import-in-javascript

import styled from 'styled-components/native'

export const MyText = styled.Text`
  font-size: 18px;
  margin: auto;
  color: white;
`

export const ListItemWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
`
export const TextButtonWrapper = styled.TouchableOpacity``

export const IconWrapper = styled.View`
  display: flex;
  flex-direction: row;
`
export const PressableIconWrapper = styled.View`
  margin: 10px;
`
import PressableIcon from '_components/PressableIcon'
function DeviceListItem({ onEdit, onSelect, data }) {
  return (
    <ListItemWrapper>
      <TextButtonWrapper onPress={() => onSelect(data)}>
        <MyText>
          {data.name} - {data.id}
        </MyText>
      </TextButtonWrapper>
      <IconWrapper>
        <PressableIconWrapper>
          <PressableIcon
            onPress={() => onEdit(data)}
            name={'pen'}
            color={'white'}
          />
        </PressableIconWrapper>
        <PressableIconWrapper>
          <PressableIcon
            onPress={() => Alert.alert('Delete Item!!!')}
            name={'trash'}
            color={'white'}
          />
        </PressableIconWrapper>
      </IconWrapper>
    </ListItemWrapper>
  )
}

export default DeviceListItem
