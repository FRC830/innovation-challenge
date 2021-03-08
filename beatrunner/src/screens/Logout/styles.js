import styled from 'styled-components/native'

export const View = styled.View`
  background: #233059;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #233059;
`
export const LogoutButton = styled.TouchableOpacity`
  background: #89CFDD;
  padding: 10px;
  border: 2px;
  border-color: black;
  border-radius: 20px;
  margin-right: 60px;
  margin-left: 60px;
  height: 50px
  width: auto;
  margin-bottom: 30px;
  margin-top: 30px;
`
export const NavigateButton = styled(LogoutButton)`
`

export const Text = styled.Text`
  color: white;
  font-family: "Lato";
  font-size: 20px;
  text-align: center;
`
