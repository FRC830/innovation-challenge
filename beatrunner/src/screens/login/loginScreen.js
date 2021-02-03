import React, { Component } from 'react'

import { View, Button, Alert } from 'react-native'

import authHandler from '_utils/authenticationHandler'

class LoginScreen extends Component {
    state = { }
    render() {
        return (
            <View>
                <Button onPress={() => authHandler.onLogin()} title="Press to login!"/>
                <Button onPress={() => Alert.alert('button pressed')} title="Create alert"/>
            </View>
        )
    }
}

export default LoginScreen;