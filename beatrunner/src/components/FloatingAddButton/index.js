import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// https://stackoverflow.com/questions/33135256/floating-action-button-on-react-native
// https://stackoverflow.com/questions/41943191/how-to-use-zindex-in-react-native
const FloatingButton = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: red;
  position: absolute;
  z-index: 999;
  elevation: 999;
  bottom: 10px;
  right: 10px;
  align-items: center;
  justify-content: center;
`

function FloatingAddButton(props) {
  const navigation = useNavigation()
  return (
    <FloatingButton
      onPress={() => {
        console.log('Clicked')
        navigation.navigate('DeviceAdd')
      }}>
      <Text>ADD</Text>
    </FloatingButton>
  )
}

export default FloatingAddButton
