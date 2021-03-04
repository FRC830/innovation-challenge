import { authorize, refresh } from 'react-native-app-auth'
import axios from 'axios'
class AuthenticationHandler {
  constructor() {
    // By default this uses PKCE so it is fine to expose this information.
    // https://formidable.com/blog/2018/oauth-and-pkce-with-react-native/
    // https://developer.spotify.com/documentation/general/guides/authorization-guide/
    this.spotifyAuthConfig = {
      clientId: '370f7233346d4cf685017239885b2a44',
      clientSecret: '483ac84f7976456c9e721a48bb99203d',
      redirectUrl: 'com.beatrunner://oauthredirect',
      scopes: [
        'playlist-read-private',
        'playlist-modify-public',
        'playlist-modify-private',
        'user-library-read',
        'user-library-modify',
        'user-top-read',
        'app-remote-control',
      ],
      serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
      },
    }
  }
  // this somewhat is outside the scope of this, but whatever
  async get(uri, accessToken, params = {}) {
    console.debug('https://api.spotify.com/v1' + uri, `Bearer ${accessToken}`)
    return axios
      .get('https://api.spotify.com/v1' + uri, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params,
      })
      .catch((err) => {
        console.debug(err)
        if (err.response) {
          console.warn(err.response.data)
        }
      })
  }
  async onLogin() {
    try {
      return await authorize(this.spotifyAuthConfig)
    } catch (error) {
      console.error('Error authorizing...', error)
    }
  }
  async refreshLogin(refreshToken) {
    try {
      console.debug(`Refreshing login with token ${refreshToken}`)
      return await refresh(this.spotifyAuthConfig, {
        refreshToken,
      })
    } catch (error) {
      console.error('Error refreshing login...', error)
    }
  }
}

const authHandler = new AuthenticationHandler()

export default authHandler
