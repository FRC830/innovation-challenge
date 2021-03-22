import React from 'react'

import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import {
  View,
  NavigateButton,
  Text,
  LogoutButton,
  CenterButtons,
  Title,
  Buttons,
} from './styles'

import Seperator from '_components/Seperator'
// "es6 object destructuring" eli/anthony if you are curious why it looks so weird
function SettingsScreen({ navigation, ...props }) {
  async function onPressLogout() {
    props.setAccessToken({ accessToken: null, accessExpiration: null })
    props.setRefreshToken({ refreshToken: null })
  }
  async function navigateToList() {
    navigation.navigate('DeviceList')
  }
  return (
    <View>
      <Title>Settings</Title>
      <Seperator />
      <Buttons>
        <NavigateButton onPress={navigateToList}>
          <Text>Navigate to device list</Text>
        </NavigateButton>
        <LogoutButton onPress={onPressLogout}>
          <Text>Logout</Text>
        </LogoutButton>
      </Buttons>
    </View>
  )
}
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
const mapDispatchToProps = {
  setAccessToken,
  setRefreshToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)
