import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

export const MyText = styled.Text`
  font-size: 18px;
  margin: auto;
`

export const ListItemWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  background: lightgray;
`
export const IconButton = styled.TouchableOpacity`
  margin-right: 5px;
`
export const MyIcon = styled(Icon)`
  font-size: 25px;
`
export const TextButtonWrapper = styled.TouchableOpacity``
