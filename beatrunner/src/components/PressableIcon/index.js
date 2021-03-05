import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
const IconButton = styled.TouchableOpacity`
  margin-right: 5px;
`
const MyIcon = styled(Icon)`
  font-size: 25px;
`

function PressableIcon({ name, onPress }) {
  return (
    <IconButton onPress={onPress}>
      <MyIcon name={name} />
    </IconButton>
  )
}

export default PressableIcon
