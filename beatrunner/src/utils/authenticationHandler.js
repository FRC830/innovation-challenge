import {
	authorize,
	refresh
} from 'react-native-app-auth';

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
            ],
            serviceConfiguration: {
                authorizationEndpoint: 'https://accounts.spotify.com/authorize',
                tokenEndpoint: 'https://accounts.spotify.com/api/token',
            },
        }
    }

    async onLogin() {
        try {
            return await authorize(this.spotifyAuthConfig)
        } catch (error) {
            console.error(error)
        }
    }
    async refreshLogin(refreshToken) {
        try {
            return await refresh(this.spotifyAuthConfig, {
            	refreshToken: refreshToken
            })
        } catch (error) {
            console.error(error)
        }
    }
}

const authHandler = new AuthenticationHandler();

export default authHandler;