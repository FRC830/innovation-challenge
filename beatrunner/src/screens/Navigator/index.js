import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { connect } from 'react-redux'
import SettingsScreen from '_screens/Settings'
import LoginScreen from '_screens/Login'
import DeviceListScreen from '_screens/DeviceList'
import DeviceAddScreen from '_screens/DeviceAdd'
import PlaylistListScreen from '_screens/PlaylistList'
import PlaylistDetailScreen from '_screens/PlaylistDetail'
import PlaylistSettingsScreen from '_screens/PlaylistSettings'
import PlayScreen from '_screens/Play'
const Stack = createStackNavigator()

function Navigator(props) {
  const mainApplicationStack = (
    <>
      <Stack.Screen name="DeviceList" component={DeviceListScreen} />
      <Stack.Screen name="DeviceAdd" component={DeviceAddScreen} />
      <Stack.Screen name="PlaylistList" component={PlaylistListScreen} />
      <Stack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Play" component={PlayScreen} />

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
  // https://aboutreact.com/react-native-hide-navigation-bar-and-make-screen-full-screen/
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {currentScreenStack}
    </Stack.Navigator>
  )
}
const mapStateToProps = (state) => {
  return {
    authentication: state.authentication,
  }
}
export default connect(mapStateToProps)(Navigator)
