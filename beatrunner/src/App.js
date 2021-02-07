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
import { createStore } from 'redux'
import {Provider} from 'react-redux';

import { persistStore } from 'redux-persist'
import LoginScreen from '_screens/login/LoginScreen'

import rootReducer from '_redux/reducers'

const store = createStore(rootReducer)
let persistor = persistStore(store)

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

