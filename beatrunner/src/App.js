/**
 * Beatrunner
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import LoginScreen from '_screens/login/LoginScreen'

// redux
import { PersistGate } from 'redux-persist/es/integration/react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import rootReducer from '_redux/reducers'

const store = createStore(rootReducer)
let persistor = persistStore(store)

// navigation

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
const Stack = createStackNavigator();

function App() {
  // Provider - Redux store
  // PersistGate - Ensure that our persisted database is loaded
  // NavigationContainer - Wrapper for all navigation
  // Stack.Navigator - A stack navigator
  // SafeAreaView - Only handle taps on screen
  // *Screen - Our pages
  return (
  <Provider store={store}>
    <PersistGate loading={<Text> Loading Store...</Text>} persistor={persistor}>
      <NavigationContainer>
        <Stack.Navigator>
          <SafeAreaView>
            <LoginScreen/>
          </SafeAreaView>
        </Stack.Navigator>
      </NavigationContainer>
    </PersistGate>
  </Provider>
  )
}

export default App