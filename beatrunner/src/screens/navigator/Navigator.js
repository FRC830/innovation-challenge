import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from "react-redux"
import LogoutScreen from '_screens/logout/LogoutScreen'
import LoginScreen from '_screens/login/LoginScreen'
import DeviceListScreen from '_screens/device-list/DeviceListScreen'
import DeviceAddScreen from '_screens/device-add/DeviceAddScreen'

const Stack = createStackNavigator();

function Navigator(props) {
    const mainApplicationStack = (
        <>
            <Stack.Screen name="Logout" component={LogoutScreen} />
            <Stack.Screen name="DeviceList" component={DeviceListScreen} />
            <Stack.Screen name="DeviceAdd" component={DeviceAddScreen} />
        </>
    )
    const currentScreenStack = (props.authentication.refreshToken == null) ?
                <Stack.Screen name="Login" component={LoginScreen} /> :
                mainApplicationStack
    return (
        <Stack.Navigator>
            {currentScreenStack}
        </Stack.Navigator>
    )
}
const mapStateToProps = state => {
	return {
		authentication: state.authentication
	}
}
export default connect(mapStateToProps)(Navigator)