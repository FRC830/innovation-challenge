import React from 'react'

import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '../login/node_modules/_redux/features/authenticationSlice'

import { View, MyButton, Text } from './styles'

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
      <MyButton onPress={navigateToList}>
        <Text>Navigate to device list</Text>
      </MyButton>
      <MyButton onPress={onPressLogout}>
        <Text>Press to logout</Text>
      </MyButton>
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
