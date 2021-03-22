import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import React from 'react'
const IconButton = styled.TouchableOpacity`
  margin-right: 5px;
`

function PressableIcon({ name, onPress, color = 'black', size = '25' }) {
  const MyIcon = styled(Icon)`
    font-size: ${size}px;
    color: ${color};
  `
  return (
    <IconButton onPress={onPress}>
      <MyIcon name={name} />
    </IconButton>
  )
}

export default PressableIcon
