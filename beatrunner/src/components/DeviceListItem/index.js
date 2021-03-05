import React from 'react'

import { Alert } from 'react-native'
// https://stackoverflow.com/questions/39282253/how-can-i-alias-a-default-import-in-javascript

import { MyText, ListItemWrapper, TextButtonWrapper } from './styles'
import PressableIcon from '_components/PressableIcon'
function DeviceListItem({ onEdit, onSelect, data }) {
  return (
    <ListItemWrapper>
      <TextButtonWrapper onPress={() => onSelect(data)}>
        <MyText>
          {data.name} - {data.id}
        </MyText>
      </TextButtonWrapper>
      <PressableIcon onPress={() => onEdit(data)} name={'pen'} />
      <PressableIcon onPress={() => Alert.alert('clicked 2')} name={'trash'} />
    </ListItemWrapper>
  )
}

export default DeviceListItem
