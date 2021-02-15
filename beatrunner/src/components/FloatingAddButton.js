import React from 'react'
import styled from 'styled-components/native'
import { Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
// https://stackoverflow.com/questions/33135256/floating-action-button-on-react-native
const FloatingButton = styled.TouchableOpacity`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: red;
    position: absolute;
    bottom: 10px;
    right: 10px;
`


function FloatingAddButton(props) {
    const navigation = useNavigation()
    return (
        <FloatingButton onclick={navigation.navigate('DeviceAdd')}>
            <Text>ADD</Text>
        </FloatingButton>
    )
}

export default FloatingAddButton