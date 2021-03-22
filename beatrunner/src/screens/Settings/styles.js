import styled from 'styled-components/native'

export const View = styled.View`
  height: 100%;
  background: #233059;
  display: flex;
  flex-direction: column;
  align-items: center;
`
export const Buttons = styled.View`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
`

export const LogoutButton = styled.TouchableOpacity`
  background: #89CFDD;
  padding: 10px;
  border: 1px;
  border-color: black;
  border-radius: 20px;
  elevation: 2;
  margin-right: 60px;
  margin-left: 60px;
  height: 50px
  width: auto;
  margin-bottom: 30px;
  margin-top: 30px;
`
export const NavigateButton = styled(LogoutButton)``

export const Text = styled.Text`
  color: white;
  font-family: 'Lato';
  font-size: 20px;
  text-align: center;
`

export const Title = styled.Text`
  color: white;
  font-size: 40px;
`
