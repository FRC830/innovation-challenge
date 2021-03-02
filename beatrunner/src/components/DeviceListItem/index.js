import React from 'react'

import { Alert } from 'react-native'
// https://stackoverflow.com/questions/39282253/how-can-i-alias-a-default-import-in-javascript

import {
  MyText,
  IconButton,
  MyIcon,
  ListItemWrapper,
  TextButtonWrapper,
} from './styles'

function DeviceListItem({ onEdit, onSelect, data }) {
  return (
    <ListItemWrapper>
      <TextButtonWrapper onPress={() => onSelect(data)}>
        <MyText>
          {data.name} - {data.id}
        </MyText>
      </TextButtonWrapper>
      <IconButton onPress={() => onEdit(data)}>
        <MyIcon name={'pen'} />
      </IconButton>
      <IconButton onPress={() => Alert.alert('clicked 2')}>
        <MyIcon name={'trash'} />
      </IconButton>
    </ListItemWrapper>
  )
}

export default DeviceListItem
