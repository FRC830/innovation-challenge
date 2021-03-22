import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export const MyButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: #39b85c;
  padding: 14px;
  border-radius: 32px;
  justify-content: space-around;
  margin: 50px;
`
// margin-top: 50%;
export const MyButtonText = styled.Text`
  color: white;
  margin-right: 20px;
  font-size: 20px;
`

export const MyIcon = styled(Icon)`
  font-size: 40px;
  color: white;
`

export const MyText = styled.Text``

export const MyView = styled.View`
  background: #89cfdd;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const MyImage = styled.Image`
  height: 211px;
  width: 285px;
`
// aspect-ratio: 134 / 100;
// height: 80%;
