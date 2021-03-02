/**
 * Beatrunner
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import Navigator from '_screens/Navigator/index'

// redux
import { PersistGate } from 'redux-persist/es/integration/react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import rootReducer from '_redux/reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware()))
let persistor = persistStore(store)

// navigation

import { NavigationContainer } from '@react-navigation/native'

function App() {
  // Provider - Redux store
  // PersistGate - Ensure that our persisted database is loaded
  // NavigationContainer - Wrapper for all navigation
  // Stack.Navigator - A stack navigator
  // SafeAreaView - Only handle taps on screen
  // *Screen - Our pages
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
