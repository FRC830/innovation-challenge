import styled from 'styled-components/native'

export const ContainerView = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  background: #233059;
`

export const MyText = styled.Text`
  color: white;
`

export const MyButton = styled.TouchableOpacity``

export const MySongList = styled.FlatList``

export const SeparatorLine = styled.View`
  width: 75%;
  height: 1px;
  background: black;
`

export const OverlaidSelectButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 10%;
  width: 80%;
  height: 40px;
  margin-left: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  background: #0b708a;
  elevation: 2;
  border-radius: 20px;
`
