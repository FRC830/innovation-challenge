import React from 'react'

import { View, Button } from 'react-native'

import { connect } from "react-redux"
import {
    setAccessToken,
    setRefreshToken,
} from '_redux/features/authenticationSlice'
// "es6 object destructuring" eli/anthony if you are curious why it looks so weird
function LogoutScreen({navigation, ...props}) {
    async function onPressLogout() {
        props.setAccessToken({accessToken: null, accessExpiration: null})
        props.setRefreshToken({refreshToken: null})
    }
    async function navigateToList() {
        navigation.navigate('DeviceList')
    }
    return (
        <View>
            <Button onPress={navigateToList} title="Navigate to device list" />
            <Button onPress={onPressLogout} title="Press to logout"/>
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

export default connect(mapStateToProps, mapDispatchToProps)(LogoutScreen)