import { combineReducers } from 'redux'

import authenticationSlice from '_redux/features/authenticationSlice'

import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const authenticationFeatureConfig = {
    key: 'authentication',
    storage: AsyncStorage, // https://github.com/rt2zz/redux-persist
    blacklist: ['accessToken', 'accessExpiration'] // Do not store this long term
}

const rootReducer = combineReducers({
    authentication: persistReducer(authenticationFeatureConfig, authenticationSlice)
})

export default rootReducer