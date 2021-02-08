import React from 'react'

import { View, Button, Alert, Text } from 'react-native'

import { connect } from "react-redux"
import {
    setAccessToken,
    setRefreshToken,
} from '_redux/features/authenticationSlice'
function LogoutScreen(props) {
    async function onPressLogout() {
        props.setAccessToken({accessToken: null, accessExpiration: null})
        props.setRefreshToken({refreshToken: null})
    }
    return (
        <View>
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