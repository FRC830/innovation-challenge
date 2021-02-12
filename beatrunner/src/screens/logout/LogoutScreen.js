import React from 'react'

import styled from 'styled-components/native'

import { connect } from "react-redux"
import {
    setAccessToken,
    setRefreshToken,
} from '_redux/features/authenticationSlice'

const View = styled.View`
    display: flex;
    flex-direction: column;
`
const MyButton = styled.TouchableOpacity`
    background: lightblue;
    padding: 10px;
    align-items: center
`
const Text = styled.Text``

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
            <MyButton onPress={navigateToList}>
                <Text>Navigate to device list</Text>
            </MyButton>
            <MyButton onPress={onPressLogout}>
                <Text>Press to logout</Text>
            </MyButton>
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