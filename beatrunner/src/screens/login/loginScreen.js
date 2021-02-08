import React from 'react'

import { View, Button, Alert, Text } from 'react-native'

import authHandler from '_utils/authenticationHandler'
import { connect } from "react-redux"
import {
    setAccessToken,
    setRefreshToken,
} from '_redux/features/authenticationSlice'
function LoginScreen(props) {
    async function onPressLogin() {
        const authenticationObject = await authHandler.onLogin()
        props.setAccessToken({accessToken: authenticationObject.accessToken, accessExpiration: authenticationObject.accessTokenExpirationDate})
        props.setRefreshToken({refreshToken: authenticationObject.refreshToken})
        console.log(authenticationObject)
    }
    return (
        <View>
            <Button onPress={onPressLogin} title="Press to login?"/>
            <Button onPress={() => Alert.alert('button pressed')} title="Create alert"/>
            <Text> { props.authentication.accessExpiration } </Text>
        </View>
    )
}
const mapStateToProps = state => {
    return {
        authentication: state.authentication
    }
}
const mapDispatchToProps = {
    setAccessToken, setRefreshToken
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);