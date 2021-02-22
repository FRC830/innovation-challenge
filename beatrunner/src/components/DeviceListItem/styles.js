import styled from 'styled-components/native'
import Icon from 'react-native-vector-icons/FontAwesome5'

const MyText = styled.Text`
  font-size: 18px;
  margin: auto;
`

const ListItemWrapper = styled.View`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: 10px;
  background: lightgray;
`
const IconButton = styled.TouchableOpacity`
  margin-right: 5px;
`
const MyIcon = styled(Icon)`
  font-size: 25px;
`
