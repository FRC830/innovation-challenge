import React from 'react'

import styled from 'styled-components/native'
import { View, Text } from 'react-native'

import authHandler from '_utils/authenticationHandler'
import { connect } from "react-redux"
import {
    setAccessToken,
    setRefreshToken,
} from '_redux/features/authenticationSlice'

const MyButton = styled.TouchableOpacity`
    align-items: center;
    background: #39B85C;
    padding: 10px;
    border-radius: 5px;
    margin: 10px;
`
const MyButtonText = styled.Text`
    color: white;
`
function LoginScreen(props) {
    async function onPressLogin() {
        const authenticationObject = await authHandler.onLogin()
        props.setAccessToken({accessToken: authenticationObject.accessToken, accessExpiration: authenticationObject.accessTokenExpirationDate})
        props.setRefreshToken({refreshToken: authenticationObject.refreshToken})
        console.log(authenticationObject)
    }
    return (
        <View>
            <MyButton onPress={onPressLogin}>
                <MyButtonText>LOGIN WITH SPOTIFY</MyButtonText>
            </MyButton>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)