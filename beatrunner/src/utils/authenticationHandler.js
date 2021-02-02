import {
	authorize,
	refresh
} from 'react-native-app-auth';

class AuthenticationHandler {
    constructor() {
        this.spotifyAuthConfig = {
            clientId: '370f7233346d4cf685017239885b2a44',
            clientSecret: '483ac84f7976456c9e721a48bb99203d',
            redirectUrl: 'com.frc830.beatrunner://oauthredirect',
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
            const result = await authorize(this.spotifyAuthConfig);
            console.log(result)
        } catch (error) {
            console.error(JSON.stringify(error))
        }
    }
    async refreshLogin(refreshToken) {
        const result = await refresh(this.spotifyAuthConfig, {
            refreshToken: refreshToken
        })
        return result
    }
}