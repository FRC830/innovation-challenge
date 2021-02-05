import React from 'react'

import { View, Button, Alert } from 'react-native'

import authHandler from '_utils/authenticationHandler'

function LoginScreen() {
    state = { }
    return (
        <View>
            <Button onPress={() => authHandler.onLogin()} title="Press to login!"/>
            <Button onPress={() => Alert.alert('button pressed')} title="Create alert"/>
        </View>
    )
}

export default LoginScreen;