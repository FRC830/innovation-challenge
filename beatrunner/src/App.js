/**
 * Beatrunner
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  View, Text, SafeAreaView
} from 'react-native'

import { PersistGate } from 'redux-persist/es/integration/react'

import LoginScreen from '_screens/login/LoginScreen'

import { store, persistor } from '_redux/store'

function App() {
  return (
  <Provider store={store}>
    <PersistGate loading={<Text/>} persistor={persistor}>
      < SafeAreaView>
        <LoginScreen/>
      </SafeAreaView>
    </PersistGate>
  </Provider>
  )
}

export default App

