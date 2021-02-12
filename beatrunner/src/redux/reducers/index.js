import { combineReducers } from 'redux'

import authenticationSlice from '_redux/features/authenticationSlice'
import deviceSlice from '_redux/features/deviceSlice'

import { persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-community/async-storage'

const authenticationFeatureConfig = {
    key: 'authentication',
    storage: AsyncStorage, // https://github.com/rt2zz/redux-persist
    blacklist: ['accessToken', 'accessExpiration'] // Do not store this long term
}

const deviceFeatureConfig = {
    key: 'devices', // Keep this the same as feature.name & reducer key name cuz IDK how it works
    storage: AsyncStorage,
}

const rootReducer = combineReducers({
    authentication: persistReducer(authenticationFeatureConfig, authenticationSlice),
    devices: persistReducer(deviceFeatureConfig, deviceSlice)
})

export default rootReducer