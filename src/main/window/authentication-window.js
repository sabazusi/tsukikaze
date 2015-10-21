import electronWindow from 'electron-window'
import TwitterAPI from 'node-twitter-api'
import jsonLoader from 'jsonloader'
import path from 'path'

export default class AuthenticationWindow
{
    constructor() {
        const windowProperty = 
        {
            width: 400,
            height: 500,
            frame: false,
            resizable: false,
            'node-integration' : false,
            'always-on-top': true
        };

        this._window = electronWindow.createWindow(windowProperty);
    }

    show () {
        let credentialFilePath = path.resolve(__dirname, '../../../', 'resources', 'authentication', 'twitter-credential.json');
        let credential = new jsonLoader(credentialFilePath);

        let twitterAPI = new TwitterAPI({
            consumerKey: credential.consumerKey,
            consumerSecret: credential.consumerSecret,
            callback: credential.callback
        });

        twitterAPI.getRequestToken((error, requestToken, requestTokenSecret) => {
            this._window.webContents.on('will-navigate', (event, url) => {
                event.preventDefault();
                var matched;
                if (matched = url.match(/\?oauth_token=([^&]*)&oauth_verifier=([^&]*)/))
                {
                    twitterAPI.getAccessToken(requestToken, requestTokenSecret, matched[2], (error, accessToken, accessTokenSecret) => {
                        // get access token.
                    });
                }
            });

            let url = twitterAPI.getAuthUrl(requestToken) + '&force_login=true';
            this._window.showUrl(url);
        });
    }
}
