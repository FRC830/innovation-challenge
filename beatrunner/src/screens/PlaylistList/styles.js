import styled from 'styled-components/native'
import Seperator from '_components/Seperator'

export const MyText = styled.Text`
  padding-left: 30px;
  color: #ffffff;
`

export const MyButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 20px;
  background: #89cfdd;
  margin: 15px;
  padding: 30px;
  font-family: serif !important;
`

export const MyList = styled.FlatList``
// background: #233059;

export const MyView = styled.View`
  background: #233059;
  height: 100%;
`

export const TitleText = styled.Text`
  font-size: 45px;
  color: white;
  text-shadow: 2px 2px 5px #89cfdd;
  margin: 5px;
`

export const TitleSeperator = styled(Seperator)`
  background: white;
`

export const TitleView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`
