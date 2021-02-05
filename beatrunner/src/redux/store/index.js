import { createStore } from 'redux'
import { persistStore } from 'redux-persist'

import { rootReducer } from '_redux/reducers'

const store = createStore(rootReducer)
let persistor = persistStore(store)

// https://github.com/rt2zz/redux-persist
// https://medium.com/javascript-in-plain-english/react-native-full-authentication-flow-with-spotify-bc0a5b895696

export default { store, persistor }