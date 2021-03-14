import React from 'react'

import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import { View, NavigateButton, Text, LogoutButton } from './styles'

// "es6 object destructuring" eli/anthony if you are curious why it looks so weird
function LogoutScreen({ navigation, ...props }) {
  async function onPressLogout() {
    props.setAccessToken({ accessToken: null, accessExpiration: null })
    props.setRefreshToken({ refreshToken: null })
  }
  async function navigateToList() {
    navigation.navigate('DeviceList')
  }
  return (
    <View>
      <NavigateButton onPress={navigateToList}>
        <Text>Navigate to device list</Text>
      </NavigateButton>
      <LogoutButton onPress={onPressLogout}>
        <Text>Logout</Text>
      </LogoutButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)
