import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import LogoutScreen from '_screens/Logout'
import LoginScreen from '_screens/Login'
import DeviceListScreen from '_screens/DeviceList'
import DeviceAddScreen from '_screens/DeviceAdd'
import PlaylistListScreen from '_screens/PlaylistList'
import PlaylistDetailScreen from '_screens/PlaylistDetail'
import PlaylistSettingsScreen from '_screens/PlaylistSettings'
const Stack = createStackNavigator()

function Navigator(props) {
  const mainApplicationStack = (
    <>
      <Stack.Screen name="Logout" component={LogoutScreen} />
      <Stack.Screen name="DeviceList" component={DeviceListScreen} />
      <Stack.Screen name="DeviceAdd" component={DeviceAddScreen} />
      <Stack.Screen name="PlaylistList" component={PlaylistListScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen
        name="PlaylistSettings"
        component={PlaylistSettingsScreen}
      />
    </>
  )
  const currentScreenStack =
    props.authentication.refreshToken == null ? (
      <Stack.Screen name="Login" component={LoginScreen} />
    ) : (
      mainApplicationStack
    )
  return <Stack.Navigator>{currentScreenStack}</Stack.Navigator>
}
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
export default connect(mapStateToProps)(Navigator)
