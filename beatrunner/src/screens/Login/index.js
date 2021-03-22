import React from 'react'

import { Text } from 'react-native'

import authHandler from '_utils/authenticationHandler'
import { connect } from 'react-redux'
import {
  setAccessToken,
  setRefreshToken,
} from '_redux/features/authenticationSlice'

import { MyButton, MyButtonText, MyIcon, MyView, MyImage } from './styles'

function LoginScreen(props) {
  async function onPressLogin() {
    const authenticationObject = await authHandler.onLogin()
    props.setAccessToken({
      accessToken: authenticationObject.accessToken,
      accessExpiration: authenticationObject.accessTokenExpirationDate,
    })
    props.setRefreshToken({ refreshToken: authenticationObject.refreshToken })
    console.log(authenticationObject)
  }
  // style={{ aspectRatio: 760 / 564, width: '70%', height: 'auto' }}
  return (
    <MyView>
      <MyImage source={require('_assets/logo.png')} />
      <MyButton onPress={onPressLogin}>
        <MyButtonText>LOGIN WITH SPOTIFY</MyButtonText>
        <MyIcon name={'spotify'} />
      </MyButton>
      <Text> {props.authentication.accessExpiration} </Text>
    </MyView>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
