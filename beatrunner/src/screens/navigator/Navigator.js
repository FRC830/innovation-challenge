import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from "react-redux"
import LogoutScreen from '_screens/logout/LogoutScreen'
import LoginScreen from '_screens/login/LoginScreen'

const Stack = createStackNavigator();

function Navigator(props) {
    const currentScreenStack = (props.authentication.refreshToken == null) ?
                <Stack.Screen name="Login" component={LoginScreen} /> :
                <Stack.Screen name="Logout" component={LogoutScreen} />
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