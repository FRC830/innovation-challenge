/**
 * Main entry point. See `src/App.js` for main application.
 */

import { AppRegistry } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

console.log('Starting...')
AppRegistry.registerComponent(appName, () => App)
